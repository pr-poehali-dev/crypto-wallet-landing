import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  address: string;
  avatar: string;
  favorite: boolean;
  lastTransaction?: string;
  totalSent?: string;
}

export const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Listyuk',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      avatar: '👩‍💼',
      favorite: true,
      lastTransaction: '10 ноя 2025',
      totalSent: '15,420 USDC'
    },
    {
      id: 2,
      name: 'Oliver Saddik',
      address: '0x8a9f2c1e4b7d3A51F8C2E9D6B4A7C1E3F5A8B2D4',
      avatar: '👨‍💻',
      favorite: true,
      lastTransaction: '8 ноя 2025',
      totalSent: '8,750 USDC'
    },
    {
      id: 3,
      name: 'Olimp Ponds',
      address: '0x1c4e5f7a9b2d8c3e6f1a4b7d9c2e5f8a1b4d7c9e',
      avatar: '🏢',
      favorite: true,
      lastTransaction: '5 ноя 2025',
      totalSent: '42,300 USDC'
    },
    {
      id: 4,
      name: 'Елена Смирнова',
      address: '0x9d2f4a7c1e5b8d3f6a9c2e5b8d1f4a7c9e2b5d8f',
      avatar: '👩‍🔬',
      favorite: false,
      lastTransaction: '1 ноя 2025',
      totalSent: '2,150 USDC'
    },
    {
      id: 5,
      name: 'Игорь Козлов',
      address: '0x3e7b2d9f4c1a8e5d7b2f9c4a1e8d5b7f2c9a4e1b',
      avatar: '👨‍🎨',
      favorite: false,
      lastTransaction: '28 окт 2025',
      totalSent: '920 USDC'
    }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAvatar, setNewAvatar] = useState('👤');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const avatarEmojis = ['👤', '👨', '👩', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎨', '👩‍🎨', '🏢', '🏪', '🏦'];

  const handleAddContact = () => {
    if (!newName || !newAddress) return;

    const newContact: Contact = {
      id: Date.now(),
      name: newName,
      address: newAddress,
      avatar: newAvatar,
      favorite: false
    };

    setContacts([...contacts, newContact]);
    setNewName('');
    setNewAddress('');
    setNewAvatar('👤');
    setShowAddContact(false);
  };

  const handleToggleFavorite = (id: number) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteContacts = filteredContacts.filter(c => c.favorite);
  const regularContacts = filteredContacts.filter(c => !c.favorite);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Users" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Контакты</h2>
            <p className="text-sm text-muted-foreground">Адресная книга</p>
          </div>
        </div>
        <Button onClick={() => setShowAddContact(!showAddContact)}>
          <Icon name={showAddContact ? "X" : "Plus"} size={16} className="mr-2" />
          {showAddContact ? 'Отмена' : 'Добавить'}
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Всего контактов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">В адресной книге</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Избранные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              {contacts.filter(c => c.favorite).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Частые переводы</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Отправлено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">69,540</div>
            <p className="text-xs text-muted-foreground mt-1">USDC всего</p>
          </CardContent>
        </Card>
      </div>

      {showAddContact && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Новый контакт</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Имя</Label>
              <Input
                id="contactName"
                placeholder="Введите имя контакта"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactAddress">Адрес кошелька</Label>
              <Input
                id="contactAddress"
                placeholder="0x..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Аватар</Label>
              <div className="flex flex-wrap gap-2">
                {avatarEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewAvatar(emoji)}
                    className={`w-12 h-12 rounded-lg border-2 text-2xl transition-all ${
                      newAvatar === emoji
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleAddContact} className="w-full" disabled={!newName || !newAddress}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Добавить контакт
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск контактов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {favoriteContacts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Star" size={16} className="text-primary" />
                <h3 className="font-semibold text-sm">Избранные</h3>
              </div>
              <div className="space-y-2">
                {favoriteContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedContact?.id === contact.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border/30 bg-muted/20 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="text-3xl">{contact.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{contact.name}</p>
                            {contact.favorite && (
                              <Icon name="Star" size={14} className="text-primary fill-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            {contact.address}
                          </p>
                          {contact.lastTransaction && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Последний перевод: {contact.lastTransaction}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {contact.totalSent && (
                          <p className="text-sm font-semibold text-success">{contact.totalSent}</p>
                        )}
                        <div className="flex gap-1 mt-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(contact.id);
                            }}
                          >
                            <Icon
                              name="Star"
                              size={16}
                              className={contact.favorite ? 'text-primary fill-primary' : 'text-muted-foreground'}
                            />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContact(contact.id);
                            }}
                          >
                            <Icon name="Trash2" size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {regularContacts.length > 0 && (
            <div>
              {favoriteContacts.length > 0 && (
                <div className="flex items-center gap-2 mb-3 mt-6">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <h3 className="font-semibold text-sm">Все контакты</h3>
                </div>
              )}
              <div className="space-y-2">
                {regularContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedContact?.id === contact.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border/30 bg-muted/20 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="text-3xl">{contact.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold">{contact.name}</p>
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            {contact.address}
                          </p>
                          {contact.lastTransaction && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Последний перевод: {contact.lastTransaction}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {contact.totalSent && (
                          <p className="text-sm font-semibold text-success">{contact.totalSent}</p>
                        )}
                        <div className="flex gap-1 mt-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(contact.id);
                            }}
                          >
                            <Icon name="Star" size={16} className="text-muted-foreground" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContact(contact.id);
                            }}
                          >
                            <Icon name="Trash2" size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredContacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="UserX" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Контакты не найдены</p>
              <p className="text-sm mt-1">Попробуйте изменить запрос</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedContact && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Быстрый перевод</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="text-4xl">{selectedContact.avatar}</div>
              <div className="flex-1">
                <p className="font-bold text-lg">{selectedContact.name}</p>
                <p className="text-sm text-muted-foreground font-mono break-all">
                  {selectedContact.address}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quickAmount">Сумма отправки</Label>
              <div className="relative">
                <Input
                  id="quickAmount"
                  type="number"
                  placeholder="0.00"
                  className="pr-20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  USDC
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['100', '500', '1000', '5000'].map((amount) => (
                <Button key={amount} variant="outline" size="sm">
                  ${amount}
                </Button>
              ))}
            </div>

            <Button className="w-full" size="lg">
              <Icon name="Send" size={18} className="mr-2" />
              Отправить
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};