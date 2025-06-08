"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, TrendingUp, Calendar, Bell } from "lucide-react";

export default function CreateSignal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [symbol, setSymbol] = useState("OPUSDT");
  const [condition, setCondition] = useState("price");
  const [crossType, setCrossType] = useState("crosses");
  const [priceType, setPriceType] = useState("value");
  const [priceValue, setPriceValue] = useState("0.642");
  const [triggerMode, setTriggerMode] = useState("once");
  const [expiryDate, setExpiryDate] = useState("2025-07-01T17:28");

  const handleCreate = () => {
    console.log("Creating alert with:", {
      symbol,
      condition,
      crossType,
      priceType,
      priceValue,
      triggerMode,
      expiryDate,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bell size={16} />
          Create Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 bg-white border-gray-200 text-gray-900">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-medium">
              Tạo Cảnh báo trên {symbol}
            </DialogTitle>
            
          </div>
        </DialogHeader>

        <div className="px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 p-0 h-auto mx-auto">
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-white   py-3 text-gray-900"
              >
                Cài đặt
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="data-[state=active]:bg-white   py-3 text-gray-900"
              >
                Tin nhắn
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-white   py-3 text-gray-900 relative"
              >
                Thông báo
                <Badge className="ml-1 bg-white text-black text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="mt-6 space-y-6">
              {/* Symbol */}
              <div className="space-y-2 grid grid-cols-4 gap-3">
                <Label className="text-sm text-gray-700">Mã giao dịch</Label>
                <div className="col-span-3 flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                    OP
                  </div>
                  <span className=" font-medium">{symbol}</span>
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2 grid grid-cols-4 gap-3">
                <Label className="w-full text-sm text-gray-700">
                  Điều kiện
                </Label>
                <div className="col-span-3">
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="h-12 w-full bg-white border-gray-300 text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="price">Giá</SelectItem>
                      <SelectItem value="volume">Khối lượng</SelectItem>
                      <SelectItem value="rsi">RSI</SelectItem>
                      <SelectItem value="macd">MACD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cross Type */}
              <div className="space-y-2 grid grid-cols-4 gap-3">
                <div className="col-start-2 col-span-3">
                  <Select value={crossType} onValueChange={setCrossType}>
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="crosses">Cắt qua</SelectItem>
                      <SelectItem value="above">Trên</SelectItem>
                      <SelectItem value="below">Dưới</SelectItem>
                      <SelectItem value="enters">Vào vùng</SelectItem>
                      <SelectItem value="exits">Ra khỏi vùng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Settings */}
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 col-start-2 grid grid-cols-2 gap-2">
                  <div className="space-y-2 ">
                    <Select value={priceType} onValueChange={setPriceType}>
                      <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="value">Giá trị</SelectItem>
                        <SelectItem value="percentage">Phần trăm</SelectItem>
                        <SelectItem value="bar">Thanh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 ">
                    <Input
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      className="bg-blue-50 border-blue-300 text-blue-700 font-mono"
                      placeholder="0.000"
                    />
                  </div>
                </div>
              </div>

              {/* Trigger Mode */}
              <div className="space-y-2 grid grid-cols-4 gap-2">
                <Label className="text-sm text-gray-700">Kích hoạt</Label>
                <div className=" space-x-2 col-span-3 grid grid-cols-2 gap-2">
                  <Button
                    variant={triggerMode === "once" ? "default" : "outline"}
                    onClick={() => setTriggerMode("once")}
                    className={`flex-1 ${
                      triggerMode === "once"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Chỉ Một lần
                  </Button>
                  <Button
                    variant={triggerMode === "repeat" ? "default" : "outline"}
                    onClick={() => setTriggerMode("repeat")}
                    className={`flex-1 ${
                      triggerMode === "repeat"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Mỗi lần
                  </Button>
                </div>
                <p className="col-start-2 col-span-3 text-xs text-gray-500">
                  Cảnh báo sẽ chỉ được kích hoạt một lần và sẽ không bị lặp lại
                </p>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2 grid grid-cols-4 gap-2">
                <Label className="text-sm text-gray-700 flex items-center space-x-2">
                  <span>Ngày hết hạn</span>
                </Label>
                <div className="  space-x-2 col-span-2">
                  <Input
                    type="datetime-local"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-white border-gray-300 text-gray-900 flex-1"
                  />
                  {/* <Calendar className="h-4 w-4 text-gray-500" /> */}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="message" className="mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">
                    Tiêu đề tin nhắn
                  </Label>
                  <Input
                    placeholder="Cảnh báo OPUSDT"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">
                    Nội dung tin nhắn
                  </Label>
                  <textarea
                    placeholder="{{ticker}} đã {{condition}} {{price}}"
                    className="w-full h-24 bg-white border border-gray-300 rounded-md p-3 text-gray-900 resize-none"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700">Thông báo đẩy</Label>
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700">Email</Label>
                  <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700">Webhook</Label>
                  <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleCreate}
            className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
          >
            Tạo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
