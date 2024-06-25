"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Bluetooth Speaker",
          picture: "https://els.id/wp-content/uploads/2023/09/Vivan-VS15-7.jpg",
          stock: 15,
          price: 252000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Headphone",
          picture: "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha",
          stock: 30,
          price: 60000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Laptop Charger",
          picture: "https://images-cdn.ubuy.co.id/6504241ab917d77b48415035-45w-19-5v-2-31a-ac-adapter-laptop.jpg",
          stock: 12,
          price: 240000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "LCD Monitor",
          picture: "https://images.philips.com/is/image/philipsconsumer/3d2d95b57d894a5e9407b01200be8bf7?$jpglarge$&wid=960",
          stock: 10,
          price: 600000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  },
};
