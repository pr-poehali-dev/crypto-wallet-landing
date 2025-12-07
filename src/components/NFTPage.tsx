import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const NFTPage = () => {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);

  const nfts = [
    {
      id: 1,
      name: 'Bored Ape #4521',
      collection: 'Bored Ape Yacht Club',
      image: '🐵',
      price: '45.2 ETH',
      rarity: 'Rare',
      owned: true
    },
    {
      id: 2,
      name: 'CryptoPunk #8857',
      collection: 'CryptoPunks',
      image: '👾',
      price: '78.5 ETH',
      rarity: 'Ultra Rare',
      owned: true
    },
    {
      id: 3,
      name: 'Azuki #3421',
      collection: 'Azuki',
      image: '🎨',
      price: '12.3 ETH',
      rarity: 'Common',
      owned: true
    },
    {
      id: 4,
      name: 'Doodle #9234',
      collection: 'Doodles',
      image: '🎭',
      price: '8.7 ETH',
      rarity: 'Rare',
      owned: true
    },
    {
      id: 5,
      name: 'Moonbird #1523',
      collection: 'Moonbirds',
      image: '🦉',
      price: '15.4 ETH',
      rarity: 'Epic',
      owned: true
    },
    {
      id: 6,
      name: 'Clone X #7712',
      collection: 'Clone X',
      image: '🤖',
      price: '6.2 ETH',
      rarity: 'Common',
      owned: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Ultra Rare': return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      case 'Epic': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'Rare': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Image" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">NFT Галерея</h2>
            <p className="text-sm text-muted-foreground">Ваша коллекция NFT</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Импорт
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Всего NFT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{nfts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">В 6 коллекциях</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Стоимость портфеля
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">166.3 ETH</div>
            <p className="text-xs text-muted-foreground mt-1">~$450,000</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Прибыль
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">+125%</div>
            <p className="text-xs text-muted-foreground mt-1">За все время</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {nfts.map((nft) => (
          <Card 
            key={nft.id}
            className={`border-border/50 bg-card/80 backdrop-blur cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
              selectedNFT === nft.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedNFT(nft.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3 text-6xl">
                {nft.image}
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
                  </div>
                  <Badge className={getRarityColor(nft.rarity)} variant="outline">
                    {nft.rarity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Цена</p>
                    <p className="font-bold">{nft.price}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icon name="Send" size={14} className="mr-1" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedNFT && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Детали NFT</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNFT(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nfts
              .filter((nft) => nft.id === selectedNFT)
              .map((nft) => (
                <div key={nft.id} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl">
                      {nft.image}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Название</p>
                        <p className="font-bold text-lg">{nft.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Коллекция</p>
                        <p className="font-semibold">{nft.collection}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Редкость</p>
                        <Badge className={getRarityColor(nft.rarity)} variant="outline">
                          {nft.rarity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Текущая цена</p>
                        <p className="font-bold text-xl">{nft.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">
                      <Icon name="Tag" size={16} className="mr-2" />
                      Продать
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить
                    </Button>
                    <Button variant="outline">
                      <Icon name="Share2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
