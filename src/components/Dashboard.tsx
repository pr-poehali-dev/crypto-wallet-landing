import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
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
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewTab } from '@/components/dashboard/OverviewTab';
import { MarketsTab } from '@/components/dashboard/MarketsTab';
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
      <DashboardHeader onPageChange={onPageChange} />

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
              <OverviewTab onPageChange={onPageChange} />
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 sm:space-y-6">
              <TransactionHistory />
            </TabsContent>

            <TabsContent value="markets" className="space-y-4 sm:space-y-6">
              <MarketsTab onPageChange={onPageChange} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};
