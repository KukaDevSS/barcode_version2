<template>
    <div class="container">
      <!-- <div class="w-full">
        <input type="text" class="form-control mx-auto">
        <div class="barcode-header">{{ laoname }}</div>
      </div> -->
    </div>
  </template>
  
  <script>
  import JsBarcode from "jsbarcode";
  
  export default {
    
    data() {
      return {
        itemCode: "",
        userName: "",
        headerText: '',
        name: "",
        count: 3,
        generatedBarcodes: [],
        barcodeOptions: {
          format: "CODE128",
          displayValue: true,
          fontSize: 30,
          lineColor: "#000000",
          width: 2.4,
          height: 100,
        },
        showAlert: false,
        alertMessage: "",
      };
    },
    
    mounted() {
        console.log(this.$route.params);
        this.itemCode = this.$route.params.barcode;
        this.headerText = this.$route.params.laoname;
        
        
        this.generateBarcodes();
        this.printBarcodes();
        
    },
    methods: {
      generateBarcodes() {
        this.generatedBarcodes = [];
        if (this.itemCode) {
          for (let i = 0; i < this.count; i++) {
          this.generatedBarcodes.push(this.itemCode);
            }
        }
        // alert(`${this.count} barcodes generated for item code: ${this.itemCode}`);
      },
      printBarcodes() {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
              <head>
                <title>Generated Barcodes</title>
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Noto+Sans+Lao&family=Noto+Serif+Lao:wght@900&family=Oswald:wght@700&family=Tapestry&display=swap');
                  @page {
                    size: 3.5cm 2cm; /* Set the size of the printed page */
                    margin: 0;
                  }
                  .barcode-container {
                    display: flex;
                    justify-content: center;
                    // align-items: center;
                    // height: 100%;
                    // width: 100%;
                  }
                  .barcode-svg {
                    /* Adjusted to 2 cm height and 3 cm width */
                    height: 1.4cm;
                    width: 3cm;
                    margin-top: -2px;
                    margin-left: 3px;
                    margin-right: 10px;
                  }                
                  .barcode-header{
                    width: 120px;
                    font-size: 8px;
                    text-align: center;
                    margin-top: -10px;
                    font-family: 'Noto Sans Lao', sans-serif;
                }
                .barcode-row {
                  display: flex;
                  justify-content: center;
                }
                </style>
              </head>
              <body>
                <div class="barcode-row">
                  ${this.generatedBarcodes
                  .map((barcode) => this.generateBarcodeHtml(barcode))
                  .join("")}  
                </div>
              </body>
            </html>
          `);
  
        printWindow.document.close();
  
        // Delay printing until the barcodes are fully rendered
        this.$nextTick(() => {
          const svgElements =
            printWindow.document.getElementsByClassName("barcode-svg");
          Array.from(svgElements).forEach((svg, index) => {
            JsBarcode(svg, this.generatedBarcodes[index], this.barcodeOptions);
          });
          // Use window.print() to print directly to the printer
          printWindow.print();
          // After printing, close the print window and navigate to the home page
          printWindow.close();
          // Navigate to the home page
          window.location.href = '/product'; 
          // this.$router.push({ name: 'product' });
        });
      },
       // Truncate a string and add an ellipsis
      truncateText(text, maxLength) {
        if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      }
      return text;
    },
      generateBarcodeHtml() {
        const svgHeight = "3cm"; // Set your desired height (e.g., "3cm")
        const svgWidth = "100%";  // Set your desired width (e.g., "5cm")

      // Modify this section to include your header text
        const headerText = this.headerText;
        const truncatedHeaderText = this.truncateText(headerText, 30); // Truncate to 20 characters // Set your desired header text
        return `
          <div class="barcode-container">
            <div>
              <div class="barcode-header">${truncatedHeaderText}</div>
                <svg class="barcode-svg" height="${svgHeight}" width="${svgWidth}"></svg>  
            </div>
          </div>
          `;
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  