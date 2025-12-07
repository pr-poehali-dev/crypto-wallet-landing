import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const ReferralPage = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'TBWALL-M4K2Z';
  const referralLink = `https://truewal.pw/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { name: 'Анна К.', date: '8 ноя 2025', bonus: '+$50', status: 'Активен' },
    { name: 'Дмитрий П.', date: '5 ноя 2025', bonus: '+$50', status: 'Активен' },
    { name: 'Елена М.', date: '1 ноя 2025', bonus: '+$50', status: 'Активен' },
    { name: 'Игорь С.', date: '28 окт 2025', bonus: '+$25', status: 'Ожидает' }
  ];

  const rewards = [
    { level: 'Бронза', referrals: 5, bonus: '$250', icon: '🥉' },
    { level: 'Серебро', referrals: 15, bonus: '$1,000', icon: '🥈' },
    { level: 'Золото', referrals: 50, bonus: '$5,000', icon: '🥇' },
    { level: 'Платина', referrals: 100, bonus: '$15,000', icon: '💎' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Users" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Реферальная программа</h2>
          <p className="text-sm text-muted-foreground">Приглашайте друзей и зарабатывайте</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Заработано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">$175</div>
            <p className="text-xs text-muted-foreground mt-1">Всего бонусов</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Рефералов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{referrals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных: {referrals.filter(r => r.status === 'Активен').length}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Уровень
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <span>🥉</span>
              <span>Бронза</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">1 до серебра</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur">
        <CardHeader>
          <CardTitle>Ваша реферальная ссылка</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 rounded-lg bg-card/80 border border-border/30 text-center">
            <p className="text-2xl font-bold mb-2">{referralCode}</p>
            <p className="text-sm text-muted-foreground mb-4">{referralLink}</p>
            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                <Icon name={copied ? "Check" : "Copy"} size={16} className="mr-2" />
                {copied ? 'Скопировано!' : 'Копировать ссылку'}
              </Button>
              <Button variant="outline">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-bold">$50</p>
              <p className="text-xs text-muted-foreground">За каждого реферала</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-bold">$25</p>
              <p className="text-xs text-muted-foreground">Бонус другу</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-3xl mb-2">♾️</div>
              <p className="font-bold">Навсегда</p>
              <p className="text-xs text-muted-foreground">Пожизненная комиссия</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Уровни наград</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewards.map((reward, idx) => {
              const progress = (referrals.length / reward.referrals) * 100;
              const isAchieved = referrals.length >= reward.referrals;
              
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    isAchieved
                      ? 'border-success/50 bg-success/5'
                      : 'border-border/30 bg-muted/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{reward.icon}</span>
                      <div>
                        <p className="font-bold">{reward.level}</p>
                        <p className="text-sm text-muted-foreground">
                          {reward.referrals} рефералов
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-success">{reward.bonus}</p>
                      {isAchieved && (
                        <Badge className="bg-success/20 text-success border-success/30 mt-1">
                          <Icon name="Check" size={12} className="mr-1" />
                          Получено
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Прогресс</span>
                      <span>{referrals.length} / {reward.referrals}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isAchieved ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Мои рефералы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referrals.map((referral, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border/30 bg-muted/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {referral.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success text-lg">{referral.bonus}</p>
                  <Badge
                    variant={referral.status === 'Активен' ? 'default' : 'outline'}
                    className={referral.status === 'Активен' ? 'bg-success/20 text-success border-success/30' : ''}
                  >
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Как это работает?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Поделитесь ссылкой</p>
                <p className="text-sm text-muted-foreground">
                  Отправьте свою реферальную ссылку друзьям
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Друг регистрируется</p>
                <p className="text-sm text-muted-foreground">
                  Ваш друг создает аккаунт и получает $25 бонусом
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Получайте награды</p>
                <p className="text-sm text-muted-foreground">
                  Вы получаете $50 + 10% от всех его транзакций навсегда
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
