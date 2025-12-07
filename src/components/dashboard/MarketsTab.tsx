import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Page } from '@/pages/Index';

interface MarketsTabProps {
  onPageChange: (page: Page) => void;
}

export const MarketsTab = ({ onPageChange }: MarketsTabProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Криптобиржи
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <a 
              href="https://www.binance.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">Binance</p>
                <p className="text-xs text-muted-foreground">Крупнейшая биржа</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a 
              href="https://www.bybit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">Bybit</p>
                <p className="text-xs text-muted-foreground">Деривативы и споты</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a 
              href="https://www.okx.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                O
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">OKX</p>
                <p className="text-xs text-muted-foreground">Web3 и криптобиржа</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a 
              href="https://www.coinbase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">Coinbase</p>
                <p className="text-xs text-muted-foreground">Крупнейшая в США</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a 
              href="https://www.kraken.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">Kraken</p>
                <p className="text-xs text-muted-foreground">Европейская биржа</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a 
              href="https://www.bitget.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">Bitget</p>
                <p className="text-xs text-muted-foreground">Копи-трейдинг</p>
              </div>
              <Icon name="ExternalLink" size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Топ криптовалют
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'Bitcoin', symbol: 'BTC', price: '$98,420.50', change: '+2.45%', positive: true },
              { name: 'Ethereum', symbol: 'ETH', price: '$3,742.18', change: '+1.82%', positive: true },
              { name: 'BNB', symbol: 'BNB', price: '$682.34', change: '-0.52%', positive: false },
              { name: 'Solana', symbol: 'SOL', price: '$234.67', change: '+5.23%', positive: true },
              { name: 'Ripple', symbol: 'XRP', price: '$2.42', change: '+12.8%', positive: true },
            ].map((crypto, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => onPageChange('price-history')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm text-white">
                    {crypto.symbol.substring(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{crypto.name}</p>
                    <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm sm:text-base">{crypto.price}</p>
                  <p className={`text-xs ${crypto.positive ? 'text-success' : 'text-destructive'}`}>
                    {crypto.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onPageChange('price-history')}
          >
            <Icon name="TrendingUp" size={18} className="mr-2" />
            Посмотреть все курсы
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
