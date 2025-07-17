
import { useState, useEffect } from 'react';
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
  const [statusFilter, setStatusFilter] = useState<string>('');

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
        title: "Order updated",
        description: `Order status changed to ${newStatus}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return'bg-orange-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-950">
      <h1 className="text-3xl font-bold text-green-500 mt-3 ">Admin Dashboard</h1>


      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card >
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{orders.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{products?.length || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              {orders.filter(order => order.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1">
         <Card >
          <CardHeader>
            <CardTitle>Count Of Orders</CardTitle>
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
                 {['pending', 'processing', 'Delivered', 'Cancelled'].map((status) => (
                    <TableRow key={status}>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>{status}</Badge>
                      </TableCell>
                      <TableCell>
                        {orders.filter(order => order.status === status).length}
                      </TableCell>
                    
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
        </div>

      {/* Tabs for different admin sections */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="products">Product Management</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Order Management
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All orders</SelectItem>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                     <TableHead>Payment Mode</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-mono text-sm">
                        {order._id.slice(-8)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.userId.name}</p>
                          <p className="text-sm text-gray-500">{order.userId.email}</p>
                          
                           
                          <p className="text-sm text-gray-500">_____{order.userId.role}</p>
                        </div>
                      </TableCell>
                       <TableCell>
                        <div>
                        
                            <p className="text-sm text-gray-500">{order.userId.address}</p> 
                            
                              <p className="text-sm text-gray-500">{order.userId.phone}</p>
                        
                        </div>
                      </TableCell>
                      <TableCell>NGN{order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        { order.userId.role ==='staff'? 'Cash': 'Online'}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order._id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
