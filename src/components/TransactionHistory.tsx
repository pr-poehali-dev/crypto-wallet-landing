import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  currency: string;
  date: Date;
  status: 'completed' | 'pending';
  address: string;
  fee: number;
}

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const startDate = new Date('2025-03-06');
  const endDate = new Date('2025-11-11');
  const currencies = ['USDC', 'BTC', 'ETH', 'BNB', 'SOL'];
  
  const currentDate = new Date(startDate);
  let id = 1;

  while (currentDate <= endDate) {
    const numTransactions = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numTransactions; i++) {
      const isReceive = Math.random() > 0.45;
      const currency = currencies[Math.floor(Math.random() * currencies.length)];
      
      let amount: number;
      if (currency === 'USDC') {
        amount = Math.random() * 50000 + 1000;
      } else if (currency === 'BTC') {
        amount = Math.random() * 2 + 0.01;
      } else if (currency === 'ETH') {
        amount = Math.random() * 10 + 0.1;
      } else if (currency === 'BNB') {
        amount = Math.random() * 50 + 1;
      } else {
        amount = Math.random() * 100 + 5;
      }

      transactions.push({
        id: `tx_${id.toString().padStart(4, '0')}`,
        type: isReceive ? 'receive' : 'send',
        amount: parseFloat(amount.toFixed(currency === 'BTC' ? 6 : 2)),
        currency,
        date: new Date(currentDate),
        status: 'completed',
        address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
        fee: parseFloat((Math.random() * 5 + 0.5).toFixed(2))
      });
      
      id++;
    }
    
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1);
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const TransactionHistory = () => {
  const [transactions] = useState<Transaction[]>(generateTransactions());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'send' | 'receive'>('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const totalSent = transactions
    .filter((tx) => tx.type === 'send')
    .reduce((sum, tx) => sum + (tx.currency === 'USDC' ? tx.amount : 0), 0);

  const totalReceived = transactions
    .filter((tx) => tx.type === 'receive')
    .reduce((sum, tx) => sum + (tx.currency === 'USDC' ? tx.amount : 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего транзакций
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Отправлено (USDC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              ${totalSent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Получено (USDC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              ${totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={20} />
              История транзакций
            </CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/50 border-border w-full sm:w-64"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge
              variant={filterType === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilterType('all')}
            >
              Все
            </Badge>
            <Badge
              variant={filterType === 'receive' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilterType('receive')}
            >
              Получено
            </Badge>
            <Badge
              variant={filterType === 'send' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilterType('send')}
            >
              Отправлено
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'receive'
                        ? 'bg-success/20 text-success'
                        : 'bg-destructive/20 text-destructive'
                    }`}
                  >
                    <Icon name={tx.type === 'receive' ? 'ArrowDownLeft' : 'ArrowUpRight'} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">
                        {tx.type === 'receive' ? 'Получено' : 'Отправлено'}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {tx.currency}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{tx.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tx.date.toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.type === 'receive' ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {tx.type === 'receive' ? '+' : '-'}
                    {tx.amount.toLocaleString('en-US', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: tx.currency === 'BTC' ? 6 : 2
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Комиссия: ${tx.fee}</p>
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Транзакции не найдены</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
