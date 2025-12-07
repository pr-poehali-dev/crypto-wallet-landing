import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { BalanceCard } from '@/components/BalanceCard';
import { CryptoChart } from '@/components/CryptoChart';
import type { Page } from '@/pages/Index';

interface OverviewTabProps {
  onPageChange: (page: Page) => void;
}

export const OverviewTab = ({ onPageChange }: OverviewTabProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <BalanceCard />
      
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              24ч Изменение
            </CardTitle>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+2.47%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +$4,852.31
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего активов
            </CardTitle>
            <Icon name="Coins" size={16} className="text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              USDC
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Транзакций
            </CardTitle>
            <Icon name="Activity" size={16} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">
              Март - Ноябрь 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <CryptoChart />

      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('staking')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Icon name="Percent" size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Стейкинг</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Зарабатывай на своих монетах</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('nft')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Icon name="Image" size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">NFT</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Коллекция цифровых активов</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('defi')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Icon name="Landmark" size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">DeFi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Децентрализованные финансы</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('referral')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Icon name="Gift" size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Реферальная</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Приглашай и зарабатывай</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
