import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  time: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  image: string;
}

export const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const categories = ['all', 'Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Regulation'];

  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: 'Bitcoin достиг нового максимума в $45,000',
        description: 'Первая криптовалюта продолжает рост на фоне позитивных новостей о ETF. Аналитики прогнозируют дальнейшее укрепление позиций.',
        source: 'CoinDesk',
        time: '2 часа назад',
        category: 'Bitcoin',
        sentiment: 'positive',
        image: '₿'
      },
      {
        id: 2,
        title: 'Ethereum готовится к обновлению Dencun',
        description: 'Разработчики Ethereum объявили дату запуска важного обновления, которое снизит комиссии за транзакции на 90%.',
        source: 'Decrypt',
        time: '4 часа назад',
        category: 'Ethereum',
        sentiment: 'positive',
        image: '⟠'
      },
      {
        id: 3,
        title: 'SEC ужесточает регулирование DeFi протоколов',
        description: 'Комиссия по ценным бумагам США усиливает надзор за децентрализованными финансовыми платформами.',
        source: 'Bloomberg',
        time: '5 часов назад',
        category: 'Regulation',
        sentiment: 'negative',
        image: '⚖️'
      },
      {
        id: 4,
        title: 'NFT рынок показывает восстановление',
        description: 'Объемы торгов NFT выросли на 156% за последний месяц. Коллекции премиум-сегмента демонстрируют наибольший рост.',
        source: 'The Block',
        time: '8 часов назад',
        category: 'NFT',
        sentiment: 'positive',
        image: '🎨'
      },
      {
        id: 5,
        title: 'Uniswap запускает новую версию v4',
        description: 'Крупнейшая децентрализованная биржа представила революционные изменения в протоколе обмена.',
        source: 'CoinTelegraph',
        time: '10 часов назад',
        category: 'DeFi',
        sentiment: 'positive',
        image: '🦄'
      },
      {
        id: 6,
        title: 'Взлом криптобиржи: потери $50 млн',
        description: 'Хакеры атаковали среднюю биржу, украв токены на сумму более $50 млн. Расследование продолжается.',
        source: 'CoinDesk',
        time: '12 часов назад',
        category: 'Bitcoin',
        sentiment: 'negative',
        image: '⚠️'
      },
      {
        id: 7,
        title: 'Институционалы скупают Bitcoin ETF',
        description: 'Новые данные показывают рекордный приток средств в биткоин-ETF от крупных инвесторов.',
        source: 'Reuters',
        time: '14 часов назад',
        category: 'Bitcoin',
        sentiment: 'positive',
        image: '₿'
      },
      {
        id: 8,
        title: 'Vitalik Buterin представил новую дорожную карту',
        description: 'Основатель Ethereum опубликовал планы развития сети на ближайшие 5 лет.',
        source: 'Ethereum Foundation',
        time: '16 часов назад',
        category: 'Ethereum',
        sentiment: 'neutral',
        image: '⟠'
      },
      {
        id: 9,
        title: 'Aave запускает кросс-чейн lending',
        description: 'Протокол кредитования расширяет поддержку нескольких блокчейнов одновременно.',
        source: 'DeFi Pulse',
        time: '18 часов назад',
        category: 'DeFi',
        sentiment: 'positive',
        image: '👻'
      },
      {
        id: 10,
        title: 'Новые правила налогообложения криптовалют в ЕС',
        description: 'Европейский союз принял единые стандарты налогообложения цифровых активов.',
        source: 'Financial Times',
        time: '20 часов назад',
        category: 'Regulation',
        sentiment: 'neutral',
        image: '⚖️'
      }
    ];

    setNews(mockNews);
  }, []);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/20 text-success border-success/30';
      case 'negative': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/30 text-muted-foreground border-border/30';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Newspaper" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Новости</h2>
          <p className="text-sm text-muted-foreground">Последние события в крипто-мире</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Новостей сегодня
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{news.length}</div>
            <p className="text-xs text-muted-foreground mt-1">За последние 24 часа</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Позитивных
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">
              {news.filter(n => n.sentiment === 'positive').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Хорошие новости</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Негативных
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-destructive">
              {news.filter(n => n.sentiment === 'negative').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Плохие новости</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Все' : category}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {filteredNews.map((item) => (
          <Card
            key={item.id}
            className={`border-border/50 bg-card/80 backdrop-blur cursor-pointer transition-all hover:shadow-lg ${
              selectedNews?.id === item.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedNews(item)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base sm:text-lg leading-tight">{item.title}</h3>
                    <Badge className={getSentimentColor(item.sentiment)} variant="outline">
                      <Icon name={getSentimentIcon(item.sentiment)} size={12} className="mr-1" />
                      {item.sentiment === 'positive' ? 'Позитив' : item.sentiment === 'negative' ? 'Негатив' : 'Нейтрально'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Building2" size={12} />
                      <span>{item.source}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedNews && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Подробности</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNews(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{selectedNews.image}</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{selectedNews.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getSentimentColor(selectedNews.sentiment)} variant="outline">
                    <Icon name={getSentimentIcon(selectedNews.sentiment)} size={12} className="mr-1" />
                    {selectedNews.sentiment === 'positive' ? 'Позитив' : selectedNews.sentiment === 'negative' ? 'Негатив' : 'Нейтрально'}
                  </Badge>
                  <Badge variant="outline">{selectedNews.category}</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm leading-relaxed">{selectedNews.description}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Building2" size={14} />
                <span>Источник: {selectedNews.source}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{selectedNews.time}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Читать полностью
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredNews.length === 0 && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Новостей в этой категории пока нет</p>
            <p className="text-sm mt-1">Попробуйте выбрать другую категорию</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
