import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const currentBalance = 246778.19;
  const totalReceived = 328335.59;
  const totalSent = totalReceived - currentBalance;
  
  const currentDate = new Date(startDate);
  let id = 1;
  let receivedSoFar = 0;
  let sentSoFar = 0;
  
  const tempTransactions: Array<{type: 'send' | 'receive', date: Date}> = [];

  while (currentDate <= endDate) {
    const numTransactions = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numTransactions; i++) {
      const isReceive = Math.random() > 0.48;
      tempTransactions.push({
        type: isReceive ? 'receive' : 'send',
        date: new Date(currentDate)
      });
    }
    
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1);
  }
  
  const receiveCount = tempTransactions.filter(t => t.type === 'receive').length;
  const sendCount = tempTransactions.filter(t => t.type === 'send').length;
  
  tempTransactions.forEach((tempTx, index) => {
    let amount: number;
    
    if (tempTx.type === 'receive') {
      if (receivedSoFar < totalReceived) {
        const remaining = totalReceived - receivedSoFar;
        const receiveTxLeft = receiveCount - tempTransactions.slice(0, index).filter(t => t.type === 'receive').length;
        const avgAmount = remaining / receiveTxLeft;
        amount = Math.random() * (avgAmount * 1.5) + (avgAmount * 0.3);
        if (receivedSoFar + amount > totalReceived) {
          amount = totalReceived - receivedSoFar;
        }
        receivedSoFar += amount;
      } else {
        amount = Math.random() * 1000 + 100;
      }
    } else {
      if (sentSoFar < totalSent) {
        const remaining = totalSent - sentSoFar;
        const sendTxLeft = sendCount - tempTransactions.slice(0, index).filter(t => t.type === 'send').length;
        const avgAmount = remaining / sendTxLeft;
        amount = Math.random() * (avgAmount * 1.5) + (avgAmount * 0.3);
        if (sentSoFar + amount > totalSent) {
          amount = totalSent - sentSoFar;
        }
        sentSoFar += amount;
      } else {
        amount = Math.random() * 800 + 100;
      }
    }

    transactions.push({
      id: `tx_${(id++).toString().padStart(4, '0')}`,
      type: tempTx.type,
      amount: parseFloat(amount.toFixed(2)),
      currency: 'USDC',
      date: tempTx.date,
      status: 'completed',
      address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      fee: parseFloat((Math.random() * 5 + 0.5).toFixed(2))
    });
  });

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const TransactionHistory = () => {
  const [transactions] = useState<Transaction[]>(generateTransactions());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'send' | 'receive'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '7d' | '30d' | '90d'>('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    
    const now = new Date('2025-11-11');
    let matchesDate = true;
    if (dateFilter === '7d') {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      matchesDate = tx.date >= sevenDaysAgo;
    } else if (dateFilter === '30d') {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesDate = tx.date >= thirtyDaysAgo;
    } else if (dateFilter === '90d') {
      const ninetyDaysAgo = new Date(now);
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      matchesDate = tx.date >= ninetyDaysAgo;
    }
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  const totalSent = transactions
    .filter((tx) => tx.type === 'send')
    .reduce((sum, tx) => sum + (tx.currency === 'USDC' ? tx.amount : 0), 0);

  const totalReceived = transactions
    .filter((tx) => tx.type === 'receive')
    .reduce((sum, tx) => sum + (tx.currency === 'USDC' ? tx.amount : 0), 0);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Всего транзакций
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Отправлено (USDC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold text-destructive break-all">
              ${totalSent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Получено (USDC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-3xl font-bold text-success break-all">
              ${totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Icon name="History" size={18} className="sm:w-5 sm:h-5" />
              История транзакций
            </CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
                <SelectTrigger className="w-[120px] sm:w-[140px] bg-muted/50 border-border text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все время</SelectItem>
                  <SelectItem value="7d">7 дней</SelectItem>
                  <SelectItem value="30d">30 дней</SelectItem>
                  <SelectItem value="90d">90 дней</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-muted/50 border-border w-full sm:w-64 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
            <Badge
              variant={filterType === 'all' ? 'default' : 'outline'}
              className="cursor-pointer text-xs sm:text-sm"
              onClick={() => setFilterType('all')}
            >
              Все
            </Badge>
            <Badge
              variant={filterType === 'receive' ? 'default' : 'outline'}
              className="cursor-pointer text-xs sm:text-sm"
              onClick={() => setFilterType('receive')}
            >
              Получено
            </Badge>
            <Badge
              variant={filterType === 'send' ? 'default' : 'outline'}
              className="cursor-pointer text-xs sm:text-sm"
              onClick={() => setFilterType('send')}
            >
              Отправлено
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
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