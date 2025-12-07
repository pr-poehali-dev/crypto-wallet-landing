import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { BalanceCard } from '@/components/BalanceCard';
import { CryptoChart } from '@/components/CryptoChart';
import { TransactionHistory } from '@/components/TransactionHistory';
import { SendPage } from '@/components/SendPage';
import { ReceivePage } from '@/components/ReceivePage';
import { SettingsPage } from '@/components/SettingsPage';
import { ExchangePage } from '@/components/ExchangePage';
import { BuyPage } from '@/components/BuyPage';
import { SellPage } from '@/components/SellPage';
import { StakingPage } from '@/components/StakingPage';
import { NFTPage } from '@/components/NFTPage';
import { DeFiPage } from '@/components/DeFiPage';
import { QRScannerPage } from '@/components/QRScannerPage';
import { PriceHistoryPage } from '@/components/PriceHistoryPage';
import { ConverterPage } from '@/components/ConverterPage';
import { AlertsPage } from '@/components/AlertsPage';
import { ReferralPage } from '@/components/ReferralPage';
import { ContactsPage } from '@/components/ContactsPage';
import { NewsPage } from '@/components/NewsPage';
import type { Page } from '@/pages/Index';

interface DashboardProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isAccountFrozen: boolean;
  onFreezeAccount: (freeze: boolean) => void;
}

export const Dashboard = ({ currentPage, onPageChange, isAccountFrozen, onFreezeAccount }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onPageChange('home')}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Wallet" size={18} className="text-white sm:w-5 sm:h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TrueBlockWall
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">M.Kozlov@techglobal.ru</p>
              </div>
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={() => onPageChange('news')} className="h-8 w-8 sm:h-10 sm:w-10">
                <Icon name="Newspaper" size={18} className="sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onPageChange('alerts')} className="h-8 w-8 sm:h-10 sm:w-10">
                <Icon name="Bell" size={18} className="sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onPageChange('settings')} className="h-8 w-8 sm:h-10 sm:w-10">
                <Icon name="Settings" size={18} className="sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24">
        {currentPage === 'send' && <SendPage />}
        {currentPage === 'receive' && <ReceivePage />}
        {currentPage === 'settings' && <SettingsPage isAccountFrozen={isAccountFrozen} onFreezeAccount={onFreezeAccount} />}
        {currentPage === 'exchange' && <ExchangePage />}
        {currentPage === 'buy' && <BuyPage />}
        {currentPage === 'sell' && <SellPage />}
        {currentPage === 'staking' && <StakingPage />}
        {currentPage === 'nft' && <NFTPage />}
        {currentPage === 'defi' && <DeFiPage />}
        {currentPage === 'qr' && <QRScannerPage />}
        {currentPage === 'price-history' && <PriceHistoryPage />}
        {currentPage === 'converter' && <ConverterPage />}
        {currentPage === 'alerts' && <AlertsPage />}
        {currentPage === 'referral' && <ReferralPage />}
        {currentPage === 'contacts' && <ContactsPage />}
        {currentPage === 'news' && <NewsPage />}
        
        {currentPage === 'home' && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="bg-muted/50 w-full grid grid-cols-3 h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-2.5">
                <Icon name="LayoutDashboard" size={14} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Обзор</span>
                <span className="sm:hidden">Обзор</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-2.5">
                <Icon name="ArrowLeftRight" size={14} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Транзакции</span>
                <span className="sm:hidden">История</span>
              </TabsTrigger>
              <TabsTrigger value="markets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-2.5">
                <Icon name="TrendingUp" size={14} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Рынки</span>
                <span className="sm:hidden">Рынок</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
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
                    <Icon name="TrendingUp" size={18} />
                    Стейкинг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Доход 8.5%</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('nft')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="Image" size={18} />
                    NFT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">6 токенов</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('defi')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="Network" size={18} />
                    DeFi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">2 протокола</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('qr')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="QrCode" size={18} />
                    QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Сканер</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('contacts')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="Users" size={18} />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">5 контактов</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('news')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Icon name="Newspaper" size={18} />
                    Новости
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">10 новых</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowLeftRight" size={20} />
                    Обмен
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('exchange')}
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                  >
                    Обменять
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShoppingCart" size={20} />
                    Купить
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('buy')}
                    className="w-full bg-gradient-to-r from-success to-secondary"
                  >
                    Купить крипту
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Banknote" size={20} />
                    Продать
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('sell')}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    Продать крипту
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="LineChart" size={20} />
                    История
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('price-history')}
                    variant="outline"
                    className="w-full"
                  >
                    Графики цен
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calculator" size={20} />
                    Калькулятор
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('converter')}
                    variant="outline"
                    className="w-full"
                  >
                    Конвертер
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Алерты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('alerts')}
                    variant="outline"
                    className="w-full"
                  >
                    Настроить
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Реферал
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onPageChange('referral')}
                    variant="outline"
                    className="w-full border-success text-success hover:bg-success hover:text-white"
                  >
                    +$175
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="markets">
            <Card className="border-border/50 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Рынки криптовалют</CardTitle>
              </CardHeader>
              <CardContent>
                <CryptoChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border/50 z-50 safe-area-bottom">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-around py-2 sm:py-3">
            <button
              onClick={() => onPageChange('home')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === 'home' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Home" size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Главная</span>
            </button>

            <button
              onClick={() => onPageChange('send')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === 'send' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Send" size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Отправить</span>
            </button>

            <button
              onClick={() => onPageChange('receive')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === 'receive' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Download" size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Получить</span>
            </button>

            <button
              onClick={() => onPageChange('settings')}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === 'settings' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Settings" size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Настройки</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};