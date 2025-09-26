import { http, HttpResponse } from 'msw'
// 从 localStorage 加载用户数据，如果没有则初始化
const loadUsers = () => {
  const stored = localStorage.getItem('msw-users')
  if (stored) {
    return JSON.parse(stored)
  }
  // 初始用户数据
  return [
    { id: 1, username: 'admin', email: 'admin@example.com', password: '123456' }
  ]
}

// 保存用户数据到 localStorage
const saveUsers = (users) => {
  localStorage.setItem('msw-users', JSON.stringify(users))
}

// 初始化用户数据
let users = loadUsers()
let nextUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 2
export const handlers = [
  http.post('/api/login',async({request})=>{
    try{
    const { username, password } = await request.json();
    
     // 重新加载用户数据（确保是最新的）
      users = loadUsers()
      
      console.log('登录尝试:', { username, password })
      console.log('当前用户库:', users)
      
      const user = users.find(u => u.username === username && u.password === password)
      
      if (user) {
        return HttpResponse.json({
          code: 200,
          data: {
            token: `mock-jwt-token-${user.id}`,
            user: { 
              id: user.id, 
              username: user.username,
              email: user.email
            }
          },
          message: '登录成功'
        })
      } else {
        return HttpResponse.json({
          code: 400,
          message: '用户名或密码错误'
        }, { status: 400 })
      }
    } catch (error) {
      return HttpResponse.json(
        { code: 400, message: '请求参数格式错误' },
        { status: 400 }
      )
    }
  }),

  // 模拟注册POST请求
  http.post('/api/register', async ({ request }) => {
     try {
      const { username, email, password } = await request.json()
      
      // 重新加载用户数据（确保是最新的）
      users = loadUsers()
      
      console.log('注册请求:', { username, email })
      console.log('注册前用户库:', users)
      
      // 检查用户名是否已存在
      const existingUser = users.find(u => u.username === username)
      if (existingUser) {
        return HttpResponse.json({
          code: 400,
          message: '用户名已存在'
        }, { status: 400 })
      }
      
      // 检查邮箱是否已存在
      const existingEmail = users.find(u => u.email === email)
      if (existingEmail) {
        return HttpResponse.json({
          code: 400,
          message: '邮箱已被注册'
        }, { status: 400 })
      }
      
      // 创建新用户
      const newUser = {
        id: nextUserId++,
        username,
        email,
        password
      }
      
      users.push(newUser)
      saveUsers(users) // 保存到 localStorage
      
      console.log('注册后用户库:', users)
      
      return HttpResponse.json({
        code: 200,
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        },
        message: '注册成功'
      })
    } catch (error) {
      return HttpResponse.json(
        { code: 500, message: '注册失败' },
        { status: 500 }
      )
    }
  }),
  http.get('/api/users', async () => {
    users = loadUsers() // 重新加载确保数据最新
    return HttpResponse.json({
      code: 200,
      data: users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email
      })),
      message: '获取用户列表成功'
    })
  }),

  // 清空用户数据接口（用于测试）
  http.delete('/api/users', async () => {
    users = [
      { id: 1, username: 'admin', email: 'admin@example.com', password: '123456' }
    ]
    saveUsers(users)
    nextUserId = 2
    
    return HttpResponse.json({
      code: 200,
      message: '用户数据已重置'
    })
  }),
   http.get(/\.(vue|js|css|png|jpg|map)$/, () => {
    return new Response(null, { status: 200 }) // 或使用 passthrough()
  }),
];
