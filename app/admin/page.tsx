"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/components/providers"
import { Activity, BarChart3, Edit2, Save, Search, Shield, Trash2, TrendingUp, Users, X, Zap } from "lucide-react"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AdminStats {
    overview: {
        totalUsers: number
        activeUsers: number
        callsToday: number
        callsThisMonth: number
        totalCalls: number
    }
    topUsers: Array<{
        userId: string
        email: string
        count: number
    }>
    dailyUsage: Array<{
        date: string
        count: number
    }>
}

interface UserProfile {
    id: string
    email: string
    usage_limit: number
    current_usage: number
    role?: 'user' | 'admin'
}

type AdminTab = 'overview' | 'users'

export default function AdminDashboard() {
    const { user } = useAppContext()
    const [activeTab, setActiveTab] = useState<AdminTab>('overview')
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [loading, setLoading] = useState(true)

    // User management state
    const [users, setUsers] = useState<UserProfile[]>([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [editingUser, setEditingUser] = useState<string | null>(null)
    const [editLimit, setEditLimit] = useState<number>(30)
    const [saving, setSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Delete confirmation dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (!user?.id) return

        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/analytics/admin?userId=${user.id}`)
                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                } else {
                    console.error('Failed to fetch admin stats')
                }
            } catch (error) {
                console.error('Error fetching admin stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [user?.id])

    // Fetch users when switching to users tab
    useEffect(() => {
        if (activeTab === 'users' && users.length === 0 && !usersLoading && user?.id) {
            setUsersLoading(true)
            fetch(`/api/admin/users?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setUsers(data.users || []))
                .catch(err => console.error('Error fetching users:', err))
                .finally(() => setUsersLoading(false))
        }
    }, [activeTab, user?.id, users.length, usersLoading])

    const handleSaveLimit = async (userId: string) => {
        setSaving(true)
        try {
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminUserId: user?.id,
                    userId,
                    usageLimit: editLimit
                })
            })

            if (response.ok) {
                setUsers(users.map(u =>
                    u.id === userId ? { ...u, usage_limit: editLimit } : u
                ))
                setEditingUser(null)
            } else {
                alert('保存失败')
            }
        } catch (error) {
            console.error('Error saving limit:', error)
            alert('保存失败')
        } finally {
            setSaving(false)
        }
    }

    const openDeleteDialog = (userProfile: UserProfile) => {
        setUserToDelete(userProfile)
        setDeleteDialogOpen(true)
    }

    const confirmDeleteUser = async () => {
        if (!userToDelete) return

        setDeleting(true)
        try {
            const response = await fetch(`/api/admin/users?adminUserId=${user?.id}&userId=${userToDelete.id}`, {
                method: 'DELETE'
            })

            const data = await response.json()

            if (response.ok && data.success) {
                setUsers(users.filter(u => u.id !== userToDelete.id))
                toast.success('删除成功', {
                    description: `用户 ${userToDelete.email} 已被删除`
                })
            } else {
                toast.error('删除失败', {
                    description: data.error || '请稍后重试'
                })
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            toast.error('删除失败', {
                description: '网络错误，请稍后重试'
            })
        } finally {
            setDeleting(false)
            setDeleteDialogOpen(false)
            setUserToDelete(null)
        }
    }

    const handleToggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin'
        if (!confirm(`确定要将此用户${newRole === 'admin' ? '升级为管理员' : '降级为普通用户'}吗？`)) return

        try {
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminUserId: user?.id,
                    userId,
                    role: newRole
                })
            })

            if (response.ok) {
                setUsers(users.map(u =>
                    u.id === userId ? { ...u, role: newRole as 'user' | 'admin' } : u
                ))
            } else {
                alert('修改失败')
            }
        } catch (error) {
            console.error('Error toggling role:', error)
            alert('修改失败')
        }
    }

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.includes(searchQuery)
    )

    const menuItems = [
        { id: 'overview' as AdminTab, icon: BarChart3, label: '数据概览' },
        { id: 'users' as AdminTab, icon: Users, label: '用户管理' },
    ]

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">正在加载管理后台...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-[1440px] mx-auto w-full">
            <div className="flex">
                {/* Left Sidebar */}
                <aside className="w-56 shrink-0 border-r border-border bg-card/50 min-h-[calc(100vh-64px)]">
                    <nav className="p-4">
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = activeTab === item.id
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {activeTab === 'overview' && stats && (
                        <OverviewContent stats={stats} />
                    )}
                    {activeTab === 'users' && (
                        <UsersContent
                            users={filteredUsers}
                            loading={usersLoading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            editingUser={editingUser}
                            setEditingUser={setEditingUser}
                            editLimit={editLimit}
                            setEditLimit={setEditLimit}
                            saving={saving}
                            handleSaveLimit={handleSaveLimit}
                            openDeleteDialog={openDeleteDialog}
                            handleToggleRole={handleToggleRole}
                            currentUserId={user?.id}
                        />
                    )}
                </main>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-5 w-5" />
                            确认删除用户
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p>你确定要删除这个用户吗？此操作将永久删除：</p>
                            <div className="bg-muted rounded-lg p-3 mt-2">
                                <p className="font-medium text-foreground">{userToDelete?.email}</p>
                                <p className="text-xs text-muted-foreground font-mono mt-1">
                                    ID: {userToDelete?.id.slice(0, 12)}...
                                </p>
                            </div>
                            <p className="text-destructive font-medium text-sm pt-2">
                                • 用户的所有书签将被删除<br />
                                • 用户的所有标签将被删除<br />
                                • AI 调用记录将被删除
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>取消</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteUser}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting ? (
                                <>
                                    <span className="animate-spin mr-2">○</span>
                                    删除中...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    确认删除
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

// Overview Content Component
function OverviewContent({ stats }: { stats: AdminStats }) {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1">数据概览</h1>
                <p className="text-muted-foreground">AI 调用统计和用户活跃度</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">总用户数</h3>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.overview.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                        {stats.overview.activeUsers} 活跃用户 (近7天)
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">今日 AI 调用</h3>
                        <Zap className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.overview.callsToday}</div>
                    <p className="text-xs text-muted-foreground">
                        本月共 {stats.overview.callsThisMonth} 次
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">累计 AI 调用</h3>
                        <Activity className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.overview.totalCalls}</div>
                    <p className="text-xs text-muted-foreground">历史总计</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">人均调用</h3>
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold mb-1">
                        {stats.overview.totalUsers > 0
                            ? Math.round(stats.overview.callsThisMonth / stats.overview.totalUsers)
                            : 0}
                    </div>
                    <p className="text-xs text-muted-foreground">本月平均</p>
                </div>
            </div>

            {/* Top Users */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-8">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">本月活跃用户 Top 10</h3>
                    <p className="text-sm text-muted-foreground">AI 调用次数最多的用户</p>
                </div>
                <div className="space-y-4">
                    {stats.topUsers.slice(0, 10).map((topUser, index) => (
                        <div key={topUser.userId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                                    #{index + 1}
                                </div>
                                <div>
                                    <p className="font-medium">{topUser.email}</p>
                                    <p className="text-xs text-muted-foreground">{topUser.userId.slice(0, 8)}...</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">{topUser.count}</p>
                                <p className="text-xs text-muted-foreground">次调用</p>
                            </div>
                        </div>
                    ))}
                    {stats.topUsers.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">暂无数据</p>
                    )}
                </div>
            </div>

            {/* Daily Usage Chart */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">每日 AI 调用趋势 (近30天)</h3>
                    <p className="text-sm text-muted-foreground">每日 AI 分类接口调用次数</p>
                </div>
                <div className="h-64 flex items-end justify-between gap-1">
                    {stats.dailyUsage.map((day) => {
                        const maxCount = Math.max(...stats.dailyUsage.map(d => d.count), 1)
                        const height = (day.count / maxCount) * 100

                        return (
                            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80 cursor-pointer"
                                    style={{ height: `${height}%`, minHeight: day.count > 0 ? '4px' : '0' }}
                                    title={`${day.date}: ${day.count} 次`}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-center">
                    {stats.dailyUsage[0]?.date} → {stats.dailyUsage[stats.dailyUsage.length - 1]?.date}
                </div>
            </div>
        </>
    )
}

// Users Content Component
function UsersContent({
    users,
    loading,
    searchQuery,
    setSearchQuery,
    editingUser,
    setEditingUser,
    editLimit,
    setEditLimit,
    saving,
    handleSaveLimit,
    openDeleteDialog,
    handleToggleRole,
    currentUserId,
}: {
    users: UserProfile[]
    loading: boolean
    searchQuery: string
    setSearchQuery: (q: string) => void
    editingUser: string | null
    setEditingUser: (id: string | null) => void
    editLimit: number
    setEditLimit: (limit: number) => void
    saving: boolean
    handleSaveLimit: (userId: string) => void
    openDeleteDialog: (user: UserProfile) => void
    handleToggleRole: (userId: string, currentRole: string) => void
    currentUserId?: string
}) {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">正在加载用户数据...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1">用户管理</h1>
                <p className="text-muted-foreground">管理用户 AI 调用额度</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-2">总用户数</div>
                    <div className="text-3xl font-bold">{users.length}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-2">已达上限</div>
                    <div className="text-3xl font-bold text-destructive">
                        {users.filter(u => u.current_usage >= u.usage_limit).length}
                    </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-2">本月总调用</div>
                    <div className="text-3xl font-bold">
                        {users.reduce((sum, u) => sum + u.current_usage, 0)}
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="搜索用户邮箱或 ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left py-4 px-6 font-medium text-muted-foreground">用户</th>
                                <th className="text-center py-4 px-6 font-medium text-muted-foreground">角色</th>
                                <th className="text-center py-4 px-6 font-medium text-muted-foreground">本月用量</th>
                                <th className="text-center py-4 px-6 font-medium text-muted-foreground">额度上限</th>
                                <th className="text-center py-4 px-6 font-medium text-muted-foreground">使用率</th>
                                <th className="text-center py-4 px-6 font-medium text-muted-foreground">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => {
                                const usagePercent = u.usage_limit > 0 ? Math.round((u.current_usage / u.usage_limit) * 100) : 0
                                const isOverLimit = u.current_usage >= u.usage_limit

                                return (
                                    <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-medium">{u.email}</p>
                                            <p className="text-xs text-muted-foreground font-mono">{u.id.slice(0, 12)}...</p>
                                        </td>
                                        <td className="text-center py-4 px-6">
                                            <button
                                                onClick={() => handleToggleRole(u.id, u.role || 'user')}
                                                disabled={u.id === currentUserId}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${u.role === 'admin'
                                                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                    } ${u.id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                title={u.id === currentUserId ? '不能修改自己的角色' : '点击切换角色'}
                                            >
                                                {u.role === 'admin' && <Shield className="h-3 w-3" />}
                                                {u.role === 'admin' ? '管理员' : '用户'}
                                            </button>
                                        </td>
                                        <td className="text-center py-4 px-6">
                                            <span className={`font-bold text-lg ${isOverLimit ? 'text-destructive' : ''}`}>
                                                {u.current_usage}
                                            </span>
                                        </td>
                                        <td className="text-center py-4 px-6">
                                            {editingUser === u.id ? (
                                                <input
                                                    type="number"
                                                    value={editLimit}
                                                    onChange={(e) => setEditLimit(parseInt(e.target.value) || 0)}
                                                    className="w-24 px-3 py-1.5 text-center border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    min="0"
                                                    max="9999"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="font-bold text-lg">{u.usage_limit}</span>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${isOverLimit ? 'bg-destructive' : usagePercent > 80 ? 'bg-yellow-500' : 'bg-primary'
                                                            }`}
                                                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                                    />
                                                </div>
                                                <span className={`text-sm font-medium ${isOverLimit ? 'text-destructive' : ''}`}>
                                                    {usagePercent}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-center py-4 px-6">
                                            {editingUser === u.id ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleSaveLimit(u.id)}
                                                        disabled={saving}
                                                        className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                                        title="保存"
                                                    >
                                                        <Save className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingUser(null)}
                                                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                                                        title="取消"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingUser(u.id)
                                                            setEditLimit(u.usage_limit)
                                                        }}
                                                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                                                        title="编辑额度"
                                                    >
                                                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                                                    </button>
                                                    {u.id !== currentUserId && (
                                                        <button
                                                            onClick={() => openDeleteDialog(u)}
                                                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                                                            title="删除用户"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                                        {searchQuery ? '没有找到匹配的用户' : '暂无用户数据'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
