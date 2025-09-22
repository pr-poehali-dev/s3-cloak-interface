import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [s3Token, setS3Token] = useState('');
  const [cloakSettings, setCloakSettings] = useState({
    enabled: true,
    rateLimit: 1000,
    blockDuration: 300
  });
  const { toast } = useToast();

  // Mock data
  const stats = {
    totalRequests: 12847,
    blockedRequests: 234,
    s3Storage: 45.2,
    activeUsers: 156,
    serverUptime: 99.8
  };

  const recentLogs = [
    { id: 1, time: '15:42:23', type: 'info', message: 'S3 файл загружен: image-001.jpg' },
    { id: 2, time: '15:41:15', type: 'warning', message: 'Подозрительная активность с IP 192.168.1.100' },
    { id: 3, time: '15:40:01', type: 'success', message: 'Пользователь авторизован: user@example.com' },
    { id: 4, time: '15:38:45', type: 'error', message: 'Заблокирован DDoS с IP 10.0.0.50' },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Конфигурация успешно обновлена",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-sm text-gray-600">S3 & Cloak Control Center</p>
            </div>
          </div>
          <Button 
            onClick={onLogout} 
            variant="outline" 
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-6 bg-white/60 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={18} />
              <span>Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={18} />
              <span>Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="s3" className="flex items-center space-x-2">
              <Icon name="Database" size={18} />
              <span>S3</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Icon name="Users" size={18} />
              <span>Пользователи</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={18} />
              <span>Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Icon name="FileText" size={18} />
              <span>Логи</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Всего запросов
                    <Icon name="Globe" size={24} className="opacity-80" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalRequests.toLocaleString()}</p>
                  <p className="text-indigo-200 text-sm mt-2">+12% за сегодня</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Заблокировано
                    <Icon name="ShieldAlert" size={24} className="opacity-80" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.blockedRequests}</p>
                  <p className="text-amber-200 text-sm mt-2">DDoS атак</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    S3 хранилище
                    <Icon name="HardDrive" size={24} className="opacity-80" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.s3Storage} ГБ</p>
                  <Progress value={65} className="mt-2 bg-green-400" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    Активные пользователи
                    <Icon name="Users" size={24} className="opacity-80" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.activeUsers}</p>
                  <p className="text-purple-200 text-sm mt-2">Онлайн сейчас</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Activity" size={20} />
                    <span>Статус сервера</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Время работы</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {stats.serverUptime}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Защита DDoS</span>
                    <Badge variant="default" className="bg-indigo-100 text-indigo-800">
                      Активна
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">S3 соединение</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Подключено
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={20} />
                    <span>Последние события</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                      <Badge 
                        variant={log.type === 'error' ? 'destructive' : 'default'}
                        className={
                          log.type === 'success' ? 'bg-green-100 text-green-800' :
                          log.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          log.type === 'info' ? 'bg-blue-100 text-blue-800' : ''
                        }
                      >
                        {log.type}
                      </Badge>
                      <span className="text-sm text-gray-600 flex-1">{log.message}</span>
                      <span className="text-xs text-gray-400">{log.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="statistics" className="space-y-6">
            <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Аналитика и метрики</CardTitle>
                <CardDescription>Подробная статистика использования сервиса</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Графики аналитики будут добавлены</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* S3 Files */}
          <TabsContent value="s3" className="space-y-6">
            <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Управление S3</CardTitle>
                <CardDescription>Настройка Google API и управление файлами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="s3-token">Google API токен</Label>
                  <Input
                    id="s3-token"
                    type="password"
                    placeholder="Введите API токен для Google S3"
                    value={s3Token}
                    onChange={(e) => setS3Token(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleSaveSettings} className="bg-indigo-500 hover:bg-indigo-600">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить токен
                </Button>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Файлы в хранилище</h3>
                  <div className="space-y-2">
                    {['document.pdf', 'image-001.jpg', 'backup.zip', 'config.json'].map((file, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{file}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Список пользователей и их активность</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Список пользователей будет добавлен</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Настройки клоаки</CardTitle>
                <CardDescription>Конфигурация защиты от DDoS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cloak-enabled">Включить защиту от DDoS</Label>
                    <p className="text-sm text-gray-600">Автоматическая блокировка подозрительной активности</p>
                  </div>
                  <Switch
                    id="cloak-enabled"
                    checked={cloakSettings.enabled}
                    onCheckedChange={(checked) => setCloakSettings({...cloakSettings, enabled: checked})}
                  />
                </div>
                <div>
                  <Label htmlFor="rate-limit">Лимит запросов в минуту</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    value={cloakSettings.rateLimit}
                    onChange={(e) => setCloakSettings({...cloakSettings, rateLimit: parseInt(e.target.value)})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="block-duration">Время блокировки (секунды)</Label>
                  <Input
                    id="block-duration"
                    type="number"
                    value={cloakSettings.blockDuration}
                    onChange={(e) => setCloakSettings({...cloakSettings, blockDuration: parseInt(e.target.value)})}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleSaveSettings} className="bg-indigo-500 hover:bg-indigo-600">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Системные логи</CardTitle>
                <CardDescription>История событий и активности сервера</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <Badge 
                        variant={log.type === 'error' ? 'destructive' : 'default'}
                        className={
                          log.type === 'success' ? 'bg-green-100 text-green-800' :
                          log.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          log.type === 'info' ? 'bg-blue-100 text-blue-800' : ''
                        }
                      >
                        {log.type}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}