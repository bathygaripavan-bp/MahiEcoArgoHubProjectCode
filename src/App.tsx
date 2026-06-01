/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ManagerPanel from './components/ManagerPanel';
import UserProfilePage from './components/UserProfilePage';
import { LoginPage, RegisterPage } from './components/AuthPages';
import {
  HomePage,
  CowPage,
  VegetablePage,
  QuailPage,
  ProductDetailPage,
  CartPage,
  OrdersPage,
  ContactPage,
  FAQPage
} from './components/CustomerPages';
import { SEEDED_PRODUCTS, SEEDED_USERS, SEEDED_ORDERS, SEEDED_REVIEWS } from './data';
import { Product, Order, User, UserRole, CartItem, Review, Address, AppNotification } from './types';
import { NotificationBell, ToastContainer, playNotificationSound } from './components/NotificationCenter';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(SEEDED_USERS[0]);
  const [currentView, setCurrentView] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(SEEDED_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(SEEDED_ORDERS);
  const [users, setUsers] = useState<User[]>(SEEDED_USERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(SEEDED_REVIEWS);
  const [selectedProductId, setSelectedProductId] = useState<string>('cow-ghee-bilona');

  // Basic Details for Alex profile modification
  const [profileName, setProfileName] = useState('Alex Carter');
  const [profileEmail, setProfileEmail] = useState('alex.carter@ecoargo.com');
  const [profilePhone, setProfilePhone] = useState('+91 96765 43210');

  // Live real-time notification feed state
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeToasts, setActiveToasts] = useState<AppNotification[]>([]);
  const [isSimulatorActive, setIsSimulatorActive] = useState<boolean>(true);
  const prevOrdersRef = React.useRef<Order[]>(orders);

  // Tracking browser separate URI path router
  const [urlPath, setUrlPath] = useState(window.location.hash.replace('#', '') || window.location.pathname);

  useEffect(() => {
    const handleUrlChange = () => {
      const currentPath = window.location.hash.replace('#', '') || window.location.pathname;
      setUrlPath(currentPath);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Comparative order state change surveillance effect
  useEffect(() => {
    const prevOrders = prevOrdersRef.current;
    
    orders.forEach((newOrder) => {
      const oldOrder = prevOrders.find((o) => o.id === newOrder.id);
      
      if (!oldOrder) {
        // This is a brand new order during active session!
        const isInitialSeed = prevOrders.length === 0;
        if (!isInitialSeed) {
          triggerNotification(
            newOrder.id,
            'new_order',
            'placed',
            `🎉 Order #${newOrder.id} of ₹${newOrder.totalAmount} placed successfully! Thank you!`
          );
        }
      } else if (oldOrder.status !== newOrder.status) {
        // Order status changed!
        let friendlyMsg = '';
        const id = newOrder.id;
        switch (newOrder.status) {
          case 'confirmed':
            friendlyMsg = `🤝 Order #${id} has been accepted & confirmed by our Cooperative Manager!`;
            break;
          case 'processing':
            friendlyMsg = `🌱 Sustainable grading started for order #${id} in Vikarabad.`;
            break;
          case 'shipped':
            friendlyMsg = `🚚 Delivery driver is dispatching your order #${id} fresh!`;
            break;
          case 'delivered':
            friendlyMsg = `🏡 Order #${id} with organic harvest has been successfully delivered!`;
            break;
          case 'cancelled':
            friendlyMsg = `❌ Order #${id} was cancelled. Refund initialized.`;
            break;
          default:
            friendlyMsg = `Order #${id} status updated to ${newOrder.status}`;
        }
        triggerNotification(newOrder.id, oldOrder.status, newOrder.status, friendlyMsg);
      }
    });

    prevOrdersRef.current = orders;
  }, [orders]);

  // Dynamic Background Logistics Processing Simulator
  useEffect(() => {
    if (!isSimulatorActive) return;

    const interval = setInterval(() => {
      setOrders((currentOrders) => {
        const nextStatusMap: Record<Order['status'], Order['status'] | null> = {
          placed: 'confirmed',
          confirmed: 'processing',
          processing: 'shipped',
          shipped: 'delivered',
          delivered: null,
          cancelled: null,
        };

        const orderToProgress = [...currentOrders]
          .reverse()
          .find((o) => o.status !== 'delivered' && o.status !== 'cancelled');

        if (orderToProgress) {
          const nextStatus = nextStatusMap[orderToProgress.status];
          if (nextStatus) {
            return currentOrders.map((o) =>
              o.id === orderToProgress.id ? { ...o, status: nextStatus } : o
            );
          }
        }
        return currentOrders;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [isSimulatorActive]);

  const triggerNotification = (
    orderId: string,
    oldStatus: Order['status'] | 'new_order',
    newStatus: Order['status'],
    message: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderId,
      oldStatus,
      newStatus,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      read: false,
      message
    };
    
    setNotifications((prev) => [newNotif, ...prev]);
    setActiveToasts((prev) => [newNotif, ...prev]);
    playNotificationSound();
  };

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleTriggerDemoEvent = () => {
    const nonFinOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');
    if (nonFinOrders.length > 0) {
      const targetOrder = nonFinOrders[0];
      const nextStatusMap: Record<Order['status'], Order['status'] | null> = {
        placed: 'confirmed',
        confirmed: 'processing',
        processing: 'shipped',
        shipped: 'delivered',
        delivered: null,
        cancelled: null,
      };
      const nextStatus = nextStatusMap[targetOrder.status];
      if (nextStatus) {
        handleUpdateOrderStatus(targetOrder.id, nextStatus);
        return;
      }
    }

    const testOrderId = `MHE-G${Math.floor(10000 + Math.random() * 90000)}`;
    const randomFarms = ['Vikarabad Hatchery', 'Agro Dairy Block A', 'Vikarabad Greenhouse C'];
    const farm = randomFarms[Math.floor(Math.random() * randomFarms.length)];
    triggerNotification(
      testOrderId,
      'new_order',
      'shipped',
      `🚚 Sustainable carrier dispatched from ${farm} carrying fresh orders!`
    );
  };

  const navigateToUrl = (newPath: string) => {
    // Navigate with custom fallback to both hash and clean URL
    window.history.pushState({}, '', newPath);
    setUrlPath(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    navigateToUrl('/');
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    navigateToUrl('/');
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setProfileName(user.name);
    setProfileEmail(user.email);
    setProfilePhone(user.phone);

    // Dynamic redirect depending on role
    if (user.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (user.role === 'manager') {
      setCurrentView('manager-dashboard');
    } else {
      setCurrentView('home');
    }
    navigateToUrl('/');
  };

  const handleRegister = (user: User) => {
    setUsers((prev) => [...prev, user]);
    handleLogin(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    navigateToUrl('/');
  };

  // Cart Management
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Product CRUD (Admin and Manager sync)
  const handleAddProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Order Placement
  const handlePlaceOrder = (meta: { address: Address; deliverySlot: string; paymentMethod: 'online' | 'cod'; notes?: string }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee = 50;
    const discount = subtotal >= 500 ? 60 : 0;
    const codSurcharge = meta.paymentMethod === 'cod' ? 20 : 0;
    const totalAmount = subtotal + deliveryFee - discount + codSurcharge;

    const newOrder: Order = {
      id: `MHE-${Date.now().toString().slice(-5)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: profileName,
      customerEmail: profileEmail,
      customerPhone: profilePhone,
      status: 'placed',
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        image: item.product.image
      })),
      subtotal,
      deliveryFee,
      discount,
      codSurcharge,
      totalAmount,
      paymentMethod: meta.paymentMethod,
      paymentStatus: meta.paymentMethod === 'online' ? 'paid' : 'pending',
      deliverySlot: meta.deliverySlot,
      deliveryDate: new Date().toISOString().split('T')[0],
      address: meta.address,
      deliveryNotes: meta.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear shopping cart
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Custom User Role Elevators
  const handleUpdateUserRole = (userId: string, role: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
    if (userId === currentUser.id) {
      setCurrentUser((prev) => ({ ...prev, role }));
    }
  };

  // Review Submissions
  const handleAddReview = (commentText: string, ratingVal: number) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: selectedProductId,
      userName: profileName,
      rating: ratingVal,
      comment: commentText,
      date: new Date().toISOString().split('T')[0],
      isModerated: true
    };
    setReviews((prev) => [newRev, ...prev]);

    // Re-adjust product cumulative scoring
    setProducts((prevProds) =>
      prevProds.map((p) => {
        if (p.id === selectedProductId) {
          const totalRatingSum = p.rating * p.reviewsCount + ratingVal;
          const newReviewsCount = p.reviewsCount + 1;
          const newAvgRating = parseFloat((totalRatingSum / newReviewsCount).toFixed(1));
          return {
            ...p,
            rating: newAvgRating,
            reviewsCount: newReviewsCount
          };
        }
        return p;
      })
    );
  };

  // Role Simulator switchboard
  const handleRoleChange = (role: UserRole) => {
    const matchingUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(matchingUser);
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (role === 'manager') {
      setCurrentView('manager-dashboard');
    } else {
      setCurrentView('home');
    }
  };

  // Filter products strictly for search inputs on detail routes
  const productFocus = products.find((p) => p.id === selectedProductId) || products[0];

  // If we are on separate auth page URLs, render them independently
  if (urlPath === '/login' || urlPath.startsWith('/login')) {
    return (
      <LoginPage onLogin={handleLogin} navigateToUrl={navigateToUrl} />
    );
  }

  if (urlPath === '/register' || urlPath.startsWith('/register')) {
    return (
      <RegisterPage onRegister={handleRegister} navigateToUrl={navigateToUrl} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Simulation Header persistent */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        currentUser={currentUser}
        onLogout={handleLogout}
        navigateToUrl={navigateToUrl}
        notificationBellNode={
          <NotificationBell
            notifications={notifications}
            isSimulatorActive={isSimulatorActive}
            onToggleSimulator={() => setIsSimulatorActive(!isSimulatorActive)}
            onClearAll={handleClearNotifications}
            onMarkAllRead={handleMarkAllNotificationsAsRead}
            onTriggerTestEvent={handleTriggerDemoEvent}
          />
        }
      />

      {/* Main Core Body switch Router */}
      <div className="flex-grow">
        {currentUser && currentUser.role === 'admin' ? (
          <AdminPanel
            products={products}
            orders={orders}
            users={users}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateUserRole={handleUpdateUserRole}
          />
        ) : currentUser && currentUser.role === 'manager' ? (
          <ManagerPanel
            products={products}
            orders={orders}
            onUpdateProduct={handleUpdateProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        ) : (
          <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
                
                {currentView === 'cow-farming' && (
                  <CowPage products={products} onProductClick={handleProductClick} />
                )}
                
                {currentView === 'vegetable-farming' && (
                  <VegetablePage products={products} onProductClick={handleProductClick} />
                )}
                
                {currentView === 'kamju-pittala' && (
                  <QuailPage products={products} onProductClick={handleProductClick} />
                )}
                
                {currentView === 'product-detail' && (
                  <ProductDetailPage
                    product={productFocus}
                    onAddToCart={handleAddToCart}
                    reviews={reviews}
                    onSubmitReview={handleAddReview}
                  />
                )}
                
                {currentView === 'cart' && (
                  <CartPage
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveCartItem={handleRemoveCartItem}
                    onPlaceOrder={handlePlaceOrder}
                    onNavigate={handleNavigate}
                  />
                )}
                
                {currentView === 'orders' && (
                  <OrdersPage
                    orders={orders}
                    onNavigate={handleNavigate}
                    onCancelOrder={(id) => handleUpdateOrderStatus(id, 'cancelled')}
                    onUpdateStatus={handleUpdateOrderStatus}
                  />
                )}

                {currentView === 'faq' && <FAQPage />}
                
                {currentView === 'contact' && <ContactPage />}

                {currentView === 'profile' && currentUser && (
                  <UserProfilePage
                    currentUser={currentUser}
                    onUpdateProfile={({ name, email, phone }) => {
                      setProfileName(name);
                      setProfileEmail(email);
                      setProfilePhone(phone);
                      setCurrentUser({
                        ...currentUser,
                        name,
                        email,
                        phone
                      });

                      const feedbackNotif: AppNotification = {
                        id: `profile-save-${Date.now()}`,
                        orderId: 'profile',
                        newStatus: 'placed',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        read: false,
                        message: `Successfully synchronized ${currentUser.role} settings.`
                      };
                      setNotifications((prev) => [feedbackNotif, ...prev]);
                      setActiveToasts((prev) => [feedbackNotif, ...prev]);
                      playNotificationSound();
                    }}
                    ordersCount={orders.length}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        )}
      </div>

      {/* Sustainable footer block */}
      {(!currentUser || currentUser.role === 'user') && <Footer onNavigate={handleNavigate} />}

      {/* Real-time floating toast notifications container */}
      <ToastContainer toasts={activeToasts} onDismiss={handleDismissToast} />
    </div>
  );
}
