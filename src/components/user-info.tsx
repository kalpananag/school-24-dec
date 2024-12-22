import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Card className="mb-1 bg-gradient-to-r from-teal-500 to-blue-500 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">Welcome Admin User {user.name}</CardTitle>
      </CardHeader>
      {/* <CardContent>
        <div className="flex space-x-8 text-white text-lg">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </CardContent> */}
    </Card>
  )
}
