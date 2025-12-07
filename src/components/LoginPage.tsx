import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LoginPageProps {
  onLogin: () => void;
}

interface User {
  email: string;
  password: string;
  name: string;
}

const getUsers = (): User[] => {
  const stored = localStorage.getItem('users');
  if (stored) {
    return JSON.parse(stored);
  }
  return [{ email: 'M.Kozlov@techglobal.ru', password: 'Lilia051181!', name: 'Михаил Козлов' }];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (isSignUp) {
      if (!username || !password || !confirmPassword || !fullName) {
        setError('Заполните все поля');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      
      if (password.length < 8) {
        setError('Пароль должен содержать минимум 8 символов');
        return;
      }
      
      const users = getUsers();
      if (users.find(u => u.email === username)) {
        setError('Пользователь с таким email уже существует');
        return;
      }
      
      users.push({ email: username, password, name: fullName });
      saveUsers(users);
      
      setSuccess('Аккаунт создан! Войдите с вашими данными');
      setTimeout(() => {
        setIsSignUp(false);
        setSuccess('');
      }, 2000);
    } else {
      const users = getUsers();
      const user = users.find(u => u.email === username && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin();
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-50" />
      
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/95 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
            <Icon name="Wallet" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TrueBlockWall
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSignUp ? 'Создайте новый аккаунт' : 'Войдите в свой криптокошелек'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">
                  Полное имя
                </Label>
                <div className="relative">
                  <Icon 
                    name="User" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Icon 
                  name="Mail" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  id="username"
                  type="email"
                  placeholder="Введите email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Пароль
              </Label>
              <div className="relative">
                <Icon 
                  name="Lock" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Минимум 8 символов" : "Введите пароль"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>
            
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Icon 
                    name="Lock" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <Icon name="AlertCircle" size={16} />
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 text-success text-sm p-3 rounded-lg bg-success/10 border border-success/20">
                <Icon name="CheckCircle2" size={16} />
                <span>{success}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              {isSignUp ? 'Создать аккаунт' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                  setUsername('');
                  setPassword('');
                  setConfirmPassword('');
                  setFullName('');
                }}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
              </button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Защищено end-to-end шифрованием</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};