<template>
  <div class="ms-4 me-4">
    <div class="">
      <input
        type="text"
        v-model="filterKeyword"
        placeholder="ຄົ້ນຫາສິນຄ້າ..."
        class="form-control mt-4 w-25 border border-black mx-auto font-bold input"
      />
    </div>
    <div class="over container">
      <table class="w-100 mt-4">
        <thead>
          <tr class="text-center">
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ລຳດັບ</th>
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ຊື່ສິນຄ້າ</th>
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ລະຫັດບາໂຄ້ດ</th>
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ລາຄາ</th>
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ພິມລາຄາ</th>
            <th class="border border-black px-2 py-2 bg-emerald-600 text-sm text-white uppercase fw-normal">ພິມຊື່</th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="item in displayedProductItems" :key="item.id">
            <td class="border border-black px-2 py-2 text-center text-black">{{ item.id }}</td>
            <td class="border border-black px-2 py-2 text-center text-black">{{ item.laoname }}</td>
            <td class="border border-black px-2 py-2 text-center text-black">{{ item.barcode }}</td>
            <td class="border border-black px-2 py-2 text-center text-black">{{ (parseFloat(item.price1) / 1000).toFixed(3) + " ກີບ" }}</td>
            <td class="border border-black px-2 py-2 text-center text-black">
              <router-link :to="{name:'codePrice', params:{id: item.id, barcode: item.barcode, price: item.price1}}">
                <button class="btn text-white" style="background-color: #059669;"><i class="bi bi-printer"></i> ພິມ</button>
              </router-link>
            </td>
            <td class="border border-black px-2 py-2 text-center text-black">
              <router-link :to="{name:'Barcode', params:{barcode: item.barcode, laoname: item.laoname}}">
                <button class="btn text-white" style="background-color: #059669;"><i class="bi bi-printer"></i> ພິມ</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <button class="page-link" @click="previousPage" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="page-item" v-for="page in visiblePageRange" :key="page" :class="{ 'active': currentPage === page }">
              <button class="page-link page-button" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <button class="page-link" @click="nextPage" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { apiUrlProducts, apiUrlProductItem, apiKey } from '../../Apiconfig';

export default {
  data() {
    return {
      filterKeyword: '',
      itemsPerPage: 10,
      currentPage: 1,
      productItems: [],
      apiUrlProductItem: apiUrlProductItem,
      apiUrlProducts: apiUrlProducts,
      apiKey: apiKey,
    };
  },
  computed: {
    filteredProductItems() {
      const keyword = this.filterKeyword.toLowerCase().trim();
      return this.productItems.filter((item) => {
        // Check if any of the fields match the filter keyword
        return (
          item.laoname.toLowerCase().includes(keyword) ||
          item.barcode.toLowerCase().includes(keyword) ||
          (parseFloat(item.price1) / 1000)
            .toFixed(3)
            .toLowerCase()
            .includes(keyword)
        );
      });
    },
    displayedProductItems() {
      return this.filteredProductItems.slice(this.startIndex, this.endIndex);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.currentPage * this.itemsPerPage;
    },
    totalPages() {
      return Math.ceil(this.filteredProductItems.length / this.itemsPerPage);
    },
    visiblePageRange() {
      const maxVisibleButtons = 5; // Adjust this value as needed
      const startPage = Math.max(this.currentPage - Math.floor(maxVisibleButtons / 2), 1);
      const endPage = Math.min(startPage + maxVisibleButtons - 1, this.totalPages);
      const pageRange = [];
      for (let i = startPage; i <= endPage; i++) {
        pageRange.push(i);
      }
      return pageRange;
    },
  },
  mounted() {
    this.fetchProductItems();
  },
  methods: {
    async fetchProductItems() {
      try {
        // Use Axios to fetch data for better error handling
        const responseProductItem = await axios.get(this.apiUrlProductItem, {
          headers: { Authorization: this.apiKey },
        });
        const responseProducts = await axios.get(this.apiUrlProducts, {
          headers: { Authorization: this.apiKey },
        });

        if (responseProductItem.status !== 200 || responseProducts.status !== 200) {
          throw new Error('HTTP error in one or more API requests.');
        }

        const productItems = responseProductItem.data;
        const products = responseProducts.data;

        const productMap = {};
        products.forEach((product) => {
          productMap[product.id] = product.laoname;
        });

        this.productItems = productItems.map((item) => ({
          ...item,
          laoname: productMap[item.fk_product_id] || '', // Updated to use 'fk_product_id'
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Noto+Sans+Lao&family=Noto+Serif+Lao:wght@900&family=Oswald:wght@700&family=Tapestry&display=swap');

* {
  font-family: 'Noto Sans Lao', sans-serif;
}

.input {
  font-family: 'Noto Sans Lao', sans-serif;
}

.fw-normal {
  font-size: 16px;
}


</style>
