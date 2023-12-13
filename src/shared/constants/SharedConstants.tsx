//  Aircraft

import { SidebarInterface } from '../models/sharedModels'

export const Airobject: SidebarInterface = {
  type: 'picture',
  key: '3_EW Air Picture',
  id: '1',
  label: 'Recognized Air Picture',
  icon: 'fa fa fa-jet-fighter-up text-danger',
  status: 'ND',
  selectable: false,
  children: [
    {
      type: 'tag',
      key: 'open Sky',
      id: '3',
      label: 'Open Sky',
      icon: '',
      showAir: true,
      children: [],
      children_ids: [],
    },
    // {
    //   type: 'tag',
    //   key: 'Dangerous',
    //   id: '1',
    //   icon: 'pi pi-fw pi-home',
    //   label: 'Dangerous Hot Area',
    //   children: [],
    //   children_ids: [],
    // },
    // {
    //   type: 'tag',
    //   key: '2_Zones  N',
    //   id: '2',
    //   label: 'Zones',
    //   icon: 'pi pi-fw pi-home',
    //   children: [],
    //   children_ids: [],
    // },
  ],
  children_ids: [],
}

// vessel

export const Vesselobject: SidebarInterface = {
  type: 'picture',
  key: '4_Recognized Maritime Picture',
  id: '4',
  icon: 'fa fa-solid fa-ship text-primary',
  label: 'Recognized Maritime Picture',
  selectable: false,
  children: [
    {
      type: 'tag',
      key: 'AIS',
      id: '3',
      label: 'AIS',
      icon: '',
      showShip: true,
      children: [
        // {
        //   type: 'tag',
        //   key: 'tUG TOW',
        //   id: '3',
        //   label: 'TUG TOW',
        //   showShip: true,
        //   icon: '',
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'FISHING',
        //   id: '4',
        //   label: 'FISHING',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'MILITARY',
        //   id: '5',
        //   label: 'MILITARY',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'PLEASURE CRAFT/SAILING',
        //   id: '6',
        //   label: 'PLEASURE CRAFT/SAILING',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'PASSENGER',
        //   id: '7',
        //   label: 'PASSENGER',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'CARGO',
        //   id: '8',
        //   label: 'CARGO',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
        // {
        //   type: 'tag',
        //   key: 'TANKER',
        //   id: '9',
        //   label: 'TANKER',
        //   // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
        //   showShip: true,
        //   children: [],
        //   children_ids: [],
        // },
      ],
      children_ids: [],
    },
  ],
  children_ids: [],
}

//Logistics Data

export const Logisticsobject: SidebarInterface = {
  key: '5_Recognized Land Picture',
  id: '5',
  label: 'Recognized Land Picture',
  icon: 'fa fa-solid fa-truck-monster text-dark',
  type: 'picture',
  selectable: false,

  children: [
    {
      type: 'tag',
      key: 'Logistics',
      id: '3',
      label: 'Logistics',
      // icon: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPvSURBVHgBpVZNbBtVEP7e2+f980/8H8dRGkdFhYhSCTUcEEKiIHFA4dJeCEKtekAqICQOiGtdIU4cygW4cKAHlBYURMWBC9AeuEQKgqqohUoNgbZOCG7WaZL6J7v7Oru2E7teW5E60nr37cz7ZnbmezNmGCD6XHXcdRonGOQRuJgEw3BLVabnP6SLH7mUX9VmEkv9MFgg8KxVkByfkvoV7EEkZ+e47RaDHPU40M6vvy2Z/IgU8fa7IVWBqnSbWjUHtpR4Y0LD6wUVOa2pl6578mBCfBnoQP9m/TTubBRx556/5lxBJJZAJqJBYU1TLaXAGBVY3drGSzmB5zICkzEOtY0ksUSwcz64dH7ZcaDNVt5npY2P2fytHYfJTB5GOIqH5V6eYWwyhLcO6BgSDPFQ99dFBSpRwSrk4Zyv0YvXCzIVu8purkXICRjn0DQDyWwejPEeBw0DqIxx1KOBJfSkwl31UHXGvCX85TWryGFF/M8iwOF8AYoI9dsMtQpkb7ioxhnK+3mQSdxVGp/Q/RjTX7tUYK72d1tjmBGKfBR7leUnFdh6sE5jGykBJ3TcK7UXcSKdQzwVxtPPGkgPC6SJGVERvHnlPwff/bCF3HUH9xMM1j5OdO22qcnIu1Qi5YhX+lg8DU03sf8JzQePhdADzikQU6GaEWVHxgX0Fw38uWjj5oqNxv8uNoe7PZD5MwLMPeg9hojrybRAbqyZe1PpLWCCuJindGRanJw8rAF0XfnHxtkrNZSp+KWq2xnSYYqRpaNxFS8fTSI6pCFGbzQCN5TetEg6WEGHf9+IwHHT9J8X7to4v1Rr78gJ9/kCxiksDzxFOY/1ybknVoMo6kqU64Bo+XHI52pD7thMUVl/XuZYrTe/RCBrLG/qoREvI4PA/Xjo2rS9Sw602/XHSpyI/9ci7bpq2XhUqZLji7frqDRadZDyhpCO/Ilx9sKllToW1mw/w16uN7ZdPLqwb5k5tzXi2NulsOA4lG6eGC/Pv65WA7dMhDmmR1XoVIRIBxEu/NvAtXWnG96VE36p1K+t75lk04KI7nVNhxzYsjfP1MDwzuO630GzRNVQB+3nyza+WKzvrJMau/zhU8rJZrOjAeNy9lvnDAiSs1NhjJscBZNhT+Li4m67vlA5RbfPB9lndY4MUVnlzVPdT6bi4sybj4nLNsTv3QNn1irS+Dvdb2OE+n7O7O6ypS0b9+1dQkhXFhsziTPtdVfzoJlapCH+HmV/LchBNKQgqnZfRqul0J4K/ZzqBPek79CnmIpE3xPYgxD4rCLUD6rHzNsP6wZWy/93wXCUzF6l8XeA7vkW5DKhLkiweSOCz9an41Y/jAdxJD0YLqnsrQAAAABJRU5ErkJggg==",
      showLogistic: true,
      children: [],
      children_ids: [],
    },
  ],
  children_ids: [],
}

export const SatelliteObject: SidebarInterface = {
  key: '6_Recognized Satellite Picture',
  id: '6',
  label: 'Recognized Satellite Picture',
  icon: 'fa fa-solid fa-satellite-dish text-info',
  type: 'picture',
  selectable: false,

  children: [
    {
      key: '7_Recognized Satellite Picture',
      id: '7',
      label: 'Satellite Tracks',
      icon: '',
      type: 'picture',
      showSatellite: true,
      children: [],
      children_ids: [],
    },
  ],
  children_ids: [],
}

export const WeatherObject: SidebarInterface = {
  key: '7_Recognized Weather Picture',
  id: '7',
  label: 'Weather Picture',
  icon: 'fa fa-solid fa-cloud text-secondry',

  type: 'picture',
  selectable: false,

  children: [
    {
      key: '8_Recognized Weather Picture',
      id: '8',
      label: 'Wind Stream',
      icon: '',
      type: 'picture',
      url:
        'http://openportguide.org/tiles/actual/wind_stream/0h/{z}/{x}/{y}.png',
      showWind: true,
      children: [],
      children_ids: [],
    },
    {
      key: '9_Recognized Precipitation Picture',
      id: '9',
      label: 'Precipitation',
      icon: '',
      type: 'picture',
      showPrecipitation: true,
      url:
        'http://openportguide.org/tiles/actual/precipitation/0h/{z}/{x}/{y}.png',
      children: [],
      children_ids: [],
    },
    {
      key: '10_Recognized Weather Picture',
      id: '10',
      label: 'Surface Pressure',
      icon: '',
      type: 'picture',
      url:
        'http://openportguide.org/tiles/actual/surface_pressure/0h/{z}/{x}/{y}.png',
      showSurfacePressure: true,
      children: [],
      children_ids: [],
    },
    {
      key: '11_Recognized Weather Picture',
      id: '11',
      label: 'Air Temperature',
      icon: '',
      url:
        'http://openportguide.org/tiles/actual/air_temperature/0h/{z}/{x}/{y}.png',
      type: 'picture',
      showAirTemperature: true,
      children: [],
      children_ids: [],
    },
  ],
  children_ids: [],
}
