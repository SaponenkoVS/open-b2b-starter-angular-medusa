import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderLine {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-bulk-order',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Bulk Order</h1>

      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Add Products</h2>
        <div class="flex space-x-2 mb-4">
          <input
            [(ngModel)]="newItem.sku"
            placeholder="SKU"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            [(ngModel)]="newItem.name"
            placeholder="Product Name"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            [(ngModel)]="newItem.quantity"
            type="number"
            min="1"
            placeholder="Qty"
            class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            [(ngModel)]="newItem.price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            class="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            (click)="addItem()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Add
          </button>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Or paste CSV data (SKU, Name, Quantity, Price):</label
          >
          <textarea
            [(ngModel)]="csvData"
            rows="4"
            placeholder="SKU001,Product 1,10,29.99&#10;SKU002,Product 2,5,49.99"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            (click)="importCsv()"
            class="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Import CSV
          </button>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (item of orderLines(); track item.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.sku }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    [(ngModel)]="item.quantity"
                    (ngModelChange)="updateTotal(item)"
                    type="number"
                    min="1"
                    class="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ '$' + item.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {{ '$' + item.total.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    (click)="removeItem(item.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  No items in order. Add products above.
                </td>
              </tr>
            }
          </tbody>
          <tfoot class="bg-gray-50">
            <tr>
              <td colspan="4" class="px-6 py-4 text-right font-semibold text-gray-900">
                Total:
              </td>
              <td class="px-6 py-4 text-lg font-bold text-gray-900">
                {{ '$' + grandTotal().toFixed(2) }}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="mt-6 flex justify-end space-x-4">
        <button
          (click)="clearOrder()"
          class="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
        >
          Clear Order
        </button>
        <button
          (click)="submitOrder()"
          [disabled]="orderLines().length === 0"
          class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          Submit Order
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class BulkOrderComponent {
  orderLines = signal<OrderLine[]>([]);
  csvData = '';
  newItem = {
    sku: '',
    name: '',
    quantity: 1,
    price: 0,
  };

  grandTotal = signal(0);

  addItem(): void {
    if (this.newItem.sku && this.newItem.name && this.newItem.quantity > 0) {
      const item: OrderLine = {
        id: crypto.randomUUID(),
        sku: this.newItem.sku,
        name: this.newItem.name,
        quantity: this.newItem.quantity,
        price: this.newItem.price,
        total: this.newItem.quantity * this.newItem.price,
      };
      this.orderLines.update((lines) => [...lines, item]);
      this.updateGrandTotal();
      this.newItem = { sku: '', name: '', quantity: 1, price: 0 };
    }
  }

  importCsv(): void {
    if (!this.csvData.trim()) return;

    const lines = this.csvData.trim().split('\n');
    const items: OrderLine[] = [];

    for (const line of lines) {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 4) {
        const [sku, name, qty, price] = parts;
        const quantity = parseInt(qty, 10);
        const unitPrice = parseFloat(price);

        if (sku && name && !isNaN(quantity) && !isNaN(unitPrice)) {
          items.push({
            id: crypto.randomUUID(),
            sku,
            name,
            quantity,
            price: unitPrice,
            total: quantity * unitPrice,
          });
        }
      }
    }

    this.orderLines.update((lines) => [...lines, ...items]);
    this.updateGrandTotal();
    this.csvData = '';
  }

  updateTotal(item: OrderLine): void {
    item.total = item.quantity * item.price;
    this.updateGrandTotal();
  }

  removeItem(id: string): void {
    this.orderLines.update((lines) => lines.filter((item) => item.id !== id));
    this.updateGrandTotal();
  }

  clearOrder(): void {
    if (
      this.orderLines().length === 0 ||
      confirm('Are you sure you want to clear the entire order?')
    ) {
      this.orderLines.set([]);
      this.grandTotal.set(0);
    }
  }

  submitOrder(): void {
    if (this.orderLines().length > 0) {
      console.log('Submitting order:', this.orderLines());
      alert(
        `Order submitted with ${this.orderLines().length} items totaling $${this.grandTotal().toFixed(2)}`
      );
      this.clearOrder();
    }
  }

  private updateGrandTotal(): void {
    const total = this.orderLines().reduce((sum, item) => sum + item.total, 0);
    this.grandTotal.set(total);
  }
}
