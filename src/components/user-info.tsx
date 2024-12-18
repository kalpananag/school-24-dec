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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Welcome, {user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </CardContent>
    </Card>
  )
}

