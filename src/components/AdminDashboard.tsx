import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi, productApi } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderWithUser } from '@/types/order';
import { toast } from '@/hooks/use-toast';
import ProductManagement from './ProductManagement';

const AdminDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: ordersData, refetch } = useQuery({
    queryKey: ['admin-orders', statusFilter],
    queryFn: () => orderApi.getAllOrders(statusFilter === 'all' ? undefined : statusFilter),
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProducts,
  });

  const orders: OrderWithUser[] = ordersData?.orders || [];

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      toast({
        title: 'Order Updated',
        description: `Order marked as ${newStatus}.`,
      });
      refetch();
    } catch {
      toast({
        title: 'Error',
        description: 'Could not update order status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const base = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status.toLowerCase()) {
      case 'pending': return `${base} bg-yellow-100 text-yellow-800`;
      case 'processing': return `${base} bg-orange-100 text-orange-800`;
      case 'shipped': return `${base} bg-blue-100 text-blue-800`;
      case 'delivered': return `${base} bg-green-100 text-green-800`;
      case 'cancelled': return `${base} bg-red-100 text-red-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Total Products', value: products?.length || 0 },
          { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm bg-white">
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Summary Table */}
      <Card className="mb-8 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Order Count by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                <TableRow key={status}>
                  <TableCell>
                    <Badge className={getStatusColor(status)}>{status}</Badge>
                  </TableCell>
                  <TableCell>
                    {orders.filter(o => o.status === status).length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabs for Orders and Products */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="products">Product Management</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Manage Orders
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order._id}>
                        <TableCell className="font-mono text-sm">{order._id.slice(-8)}</TableCell>
                        <TableCell>
                          <p className="font-medium">{order.userId.name}</p>
                          <p className="text-sm text-gray-500">{order.userId.email}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600">{order.userId.address || 'No Address'}</p>
                          <p className="text-sm text-gray-600">{order.userId.phone}</p>
                        </TableCell>
                        <TableCell className="font-medium">₦{order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {order.userId.role === 'staff' ? 'Cash' : 'Online'}
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select value={order.status} onValueChange={val => handleStatusUpdate(order._id, val)}>
                            <SelectTrigger className="w-28 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(stat => (
                                <SelectItem key={stat} value={stat}>{stat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
