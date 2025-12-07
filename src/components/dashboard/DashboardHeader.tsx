import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Page } from '@/pages/Index';

interface DashboardHeaderProps {
  onPageChange: (page: Page) => void;
}

export const DashboardHeader = ({ onPageChange }: DashboardHeaderProps) => {
  return (
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
  );
};
