import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  email: string;
  name: string;
}

export const SettingsPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', email: 'M.Kozlov@techglobal.ru', name: 'Максим Козлов' },
  ]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAddUser = () => {
    if (newUserEmail && newUserName) {
      const newUser: User = {
        id: Date.now().toString(),
        email: newUserEmail,
        name: newUserName,
      };
      setUsers([...users, newUser]);
      setNewUserEmail('');
      setNewUserName('');
      setShowAddUser(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Безопасность</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Биометрическая аутентификация</p>
                  <p className="text-sm text-muted-foreground">
                    Используйте отпечаток пальца или Face ID
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Двухфакторная аутентификация (2FA)</p>
                  <p className="text-sm text-muted-foreground">
                    Дополнительная защита вашего аккаунта
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Автоматическая блокировка</p>
                  <p className="text-sm text-muted-foreground">
                    Блокировать после 5 минут неактивности
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push-уведомления</p>
                  <p className="text-sm text-muted-foreground">
                    Уведомления о транзакциях и изменениях баланса
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email-уведомления</p>
                  <p className="text-sm text-muted-foreground">
                    Получать отчеты на почту
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Резервное копирование</h3>
            <Button variant="outline" className="w-full">
              <Icon name="Download" size={20} className="mr-2" />
              Создать резервную копию кошелька
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={24} />
              Управление пользователями
            </CardTitle>
            <Button onClick={() => setShowAddUser(!showAddUser)} size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddUser && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newUserName">Имя пользователя</Label>
                  <Input
                    id="newUserName"
                    placeholder="Введите имя"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newUserEmail">Email</Label>
                  <Input
                    id="newUserEmail"
                    type="email"
                    placeholder="user@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddUser} className="flex-1">
                    Создать пользователя
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-muted/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="User" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                {users.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Icon name="AlertTriangle" size={24} />
            Опасная зона
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="destructive" className="w-full">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти из аккаунта
          </Button>
          <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Icon name="Trash2" size={20} className="mr-2" />
            Удалить кошелек
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};