import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Input, Button } from '../components/UI';
import { useOrders } from '../context/OrderContext';
import { Plus, Trash2, IndianRupee, ArrowLeft, Save } from 'lucide-react';

const CreateOrder = ({ onBack, onSuccess }) => {
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    notes: '',
    items: [{ id: Date.now(), name: '', price: '' }],
    advancePaid: '',
  });

  const [errors, setErrors] = useState({});

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), name: '', price: '' }],
    });
  };

  const removeItem = (id) => {
    if (formData.items.length === 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  };

  const total = calculateTotal();
  const remaining = total - (Number(formData.advancePaid) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = 'Required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const order = {
      ...formData,
      id: Date.now().toString(),
      total,
      remainingBalance: remaining,
    };
    onSuccess(order); // Pass the whole order object since we don't need to fetch it from storage
  };

  return (
    <div className="pb-32 px-5 pt-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-premium border border-white">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Instant Bill</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-primary-600 mb-2">Customer Details</h2>
          <Input 
            label="Customer Name" 
            placeholder="e.g. Priya Sharma"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            error={errors.customerName}
          />
          <Input 
            label="Phone Number" 
            placeholder="e.g. 9876543210"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            error={errors.phoneNumber}
          />
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary-600">Order Items</h2>
            <button 
              type="button" 
              onClick={addItem}
              className="p-2 bg-primary-50 text-primary-600 rounded-xl active:scale-90 transition-transform"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {formData.items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className="flex-1">
                    <Input 
                      placeholder="Item name (e.g. Blouse Work)"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-24 text-right">
                    <Input 
                      placeholder="Price"
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="p-3.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        <Card className="space-y-4 bg-primary-600 text-white">
          <h2 className="text-sm font-black uppercase tracking-widest text-primary-200">Payment Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-primary-100">Total Amount</span>
              <span className="text-xl font-bold flex items-center"><IndianRupee size={18} /> {total}</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-primary-100">Advance Paid</span>
              <div className="w-24">
                <input 
                  type="number"
                  className="w-full bg-primary-500 border-none rounded-xl px-3 py-2 text-white placeholder:text-primary-300 focus:ring-2 focus:ring-white/20 text-right font-bold"
                  placeholder="0"
                  value={formData.advancePaid}
                  onChange={(e) => setFormData({...formData, advancePaid: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-primary-500 flex justify-between items-center">
              <span className="font-bold">Remaining Balance</span>
              <span className="text-2xl font-black flex items-center"><IndianRupee size={22} /> {remaining}</span>
            </div>
          </div>
        </Card>

        <Input 
          label="Order Notes (Optional)" 
          placeholder="Specific design instructions..."
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />

        <Button type="submit" className="w-full py-4 shadow-xl shadow-primary-600/20 sticky bottom-24">
          <Save size={20} />
          <span>Save Order & Generate Invoice</span>
        </Button>
      </form>
    </div>
  );
};

export default CreateOrder;
