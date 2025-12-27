
import re
import json

def extract_data(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find questions containers
    # Looking for id="q1", id="q2" etc.
    # The structure seems to be: <div id="q1" ...> ... <p class="question">Question Text</p> ... <p class="answer" ...>Option Text</p>
    # Since it's minified, we'll try to find the blocks.

    questions = []
    
    # Try to find the A_STATS variable first to know how many questions
    stats_match = re.search(r'window\.A_STATS="([^"]+)"', content)
    weights_map = []
    if stats_match:
        stats_str = stats_match.group(1)
        weights_map = [x.split(',') for x in stats_str.split('|')]
        print(f"Found {len(weights_map)} questions in A_STATS")

    # Extract text for each question
    # Pattern: <div id="q(\d+)"[^>]*>(.*?)</div>  -- this might be too greedy or fail on nested divs if not careful.
    # Better: find start index of id="qX" and end index of id="qX+1" or similar.
    
    # Let's try to extract question text and options using specific tags if possible.
    # In Step 2544 dump, we saw: class="answer"
    
    # Updated regex to handle unquoted attributes like id=q1
    for i in range(1, len(weights_map) + 2):
        # Regex search for id=q{i} with optional quotes, followed by space or >
        # We search for the start position using regex
        pattern = re.compile(f'id=["\']?q{i}["\']?[\s>]')
        match = pattern.search(content)
        
        if match:
            start_idx = match.start()
            print(f"DEBUG: Found q{i} at {start_idx}")
            
            # Find the end by looking for the next ID
            next_pattern = re.compile(f'id=["\']?q{i+1}["\']?[\s>]')
            next_match = next_pattern.search(content, pos=start_idx)
            
            if next_match:
                end_idx = next_match.start()
            else:
                end_idx = start_idx + 3000
                print(f"DEBUG: Could not find q{i+1}, using chunk of 3000 chars")
            
            chunk = content[start_idx:end_idx]
            q_data = {
                "id": i,
                "raw": chunk
            }
            questions.append(q_data)
        else:
            print(f"DEBUG: Failed to find q{i}")

    return questions, weights_map

en_questions, en_weights = extract_data("temp_mental_en.html")

# Dump English questions for translation
print(f"Extraction EN: {len(en_questions)} questions")

if en_questions:
    print("--- Q1 Raw HTML ---")
    print(en_questions[0]['raw'])
    print("-------------------")

final_data = []

# Map weights from stats. Stats string "755,66|..."
# Each pipe is a question.
# Each comma is an option weight.
# Note: Stats often are usage counts, BUT in some quizzes they act as weights.
# Step 2544 code: `r[e]=$(this).attr("data-stat")/10` and `iq_value=JSON.stringify([r,a])`
# It sums `r`. `r` is `data-stat` / 10.
# And `data-stat` comes from `A_STATS`.
# So yes, A_STATS contains the values!
# We just need to parse `A_STATS` correctly.

# We need to rely on the EN weights map.
weights_map = en_weights

for i in range(len(en_questions)):
    en_chunk = en_questions[i]['raw']
    
    # Weights for this question
    # Note: weights_map might be shorter or longer?
    q_weights = weights_map[i] if i < len(weights_map) else []
    
    # Remove script tags
    en_chunk = re.sub(r'<script.*?>.*?</script>', '', en_chunk, flags=re.DOTALL)
    
    # Extract texts
    en_texts = re.findall(r'>([^<]+)<', en_chunk)
    en_texts = [t.strip() for t in en_texts if t.strip()]
    
    # Check for "1/31" pagination and remove
    en_texts = [t for t in en_texts if not re.match(r'^\d+/\d+$', t)]
    
    if not en_texts:
        print(f"Warning: No text for Q{i+1}")
        continue
        
    question_text = en_texts[0]
    option_texts = en_texts[1:]
    
    # Map options to weights
    options = []
    # If we have N weights, we expect N options.
    # Sometimes header text matches, so option_texts might have extra?
    # Or fewer if images are used?
    
    for idx, w in enumerate(q_weights):
        opt_text = option_texts[idx] if idx < len(option_texts) else "Unknown"
        # Value is weight / 10 based on analysis? 
        # "r[e]=$(this).attr("data-stat")/10"
        # A_STATS="755,66" -> 75.5, 6.6? 
        # Let's keep raw for now or /10. 
        # Let's keep it as number.
        options.append({
            "value": int(w), 
            "labelEn": opt_text
        })
    
    final_data.append({
        "id": i+1,
        "questionEn": question_text,
        "options": options
    })

print(json.dumps(final_data, ensure_ascii=False, indent=2))

with open("extracted_quiz.json", "w", encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False, indent=2)
