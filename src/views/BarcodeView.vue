<!-- ItemCodeToBarcode.vue -->
<template>
    <div class="container mt-10">
      <div class="">
        <div class="col-lg-6 mx-auto my-2">
            <label for="itemCode" class="mx-auto text-center uppercase">Enter Item Code:</label>
            <input class="form-control" type="text" v-model="itemCode" id="itemCode" />
        </div>
        <div class="col-lg-6 mx-auto my-2">
            <label for="count" class="uppercase">Enter Count:</label>
            <input class="form-control" type="number" v-model="count" id="count" />
        </div>

        <div class=" col-lg-6 mx-auto">
            <button class="mt-2 btn btn-primary w-100" @click="generateBarcode">Generate Barcode</button>
        </div>
        <div class=" col-lg-6 mx-auto">
            <button @click="printBarcodes" class="mt-2 btn btn-primary w-100">Print</button>
        </div>

        <div class=" mt-4 bg-purple-500 mx-auto a4size" >
            <div class="row row-cols-6 mx-auto ina4size">
                <svg v-for="barcode in count" :key="barcode" style=" margin: 0.1cm,;" class="barcode mx-auto mt-1" id="barcode" ref="barcode"></svg>
            </div>
        </div>
        <div class=" mt-4 bg-purple-500 mx-auto a4size" >
            <div class="row row-cols-6 mx-auto ina4size">
                <svg v-for="barcode in count" :key="barcode" style=" margin: 0.1cm,;" class="barcode mx-auto mt-1" id="barcode" ref="barcode"></svg>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import JsBarcode from 'jsbarcode';
  
  export default {
    data() {
      return {
        itemCode: 'NB123456789',
        count: 1,
        title: 'name',
      };
    },
    methods: {
      generateBarcode() {
        // Clear any existing barcode before generating a new one
        this.clearBarcode();
  
        // Check if itemCode is not empty
        if (this.itemCode.trim() !== '' && this.count > 0) {
        for (let i = 0; i < this.count; i++) {
          // Generate each barcode using JsBarcode
          JsBarcode(this.$refs.barcode[i], this.itemCode, {
            format: 'CODE128',
            displayValue: true,
         });
        }
       }
      },
      clearBarcode() {
        // Clear the existing barcode if any
        const barcodeDiv = this.$refs.barcode;
        while (barcodeDiv.firstChild) {
          barcodeDiv.removeChild(barcodeDiv.firstChild);
        }
      },
      printBarcodes() {
        // Add logic to open a print dialog for the barcode labels.
        window.print();
      },
    },
  };
  </script>
  
  <style>
  .barcode{
    height: 1.9cm;
    width: 3.2cm;
    background-color: white;
    border-radius: 5%;
    padding: 1px;
    /* margin: 1px; */
    /* margin-left: auto;
    margin-right: auto; */
  }
  .a4size{
    width: 10cm;
    height: auto;
  }
  /* #barcode{
    padding-top: 1px;
  } */
  </style>
  