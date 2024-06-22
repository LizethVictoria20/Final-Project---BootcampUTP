import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import User from "./User.js";

const Cart = sequelize.define(
  "Cart",
  {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Carts",
  }
);

Cart.associate = (models) => {
  Cart.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
  });
  Cart.hasMany(models.CartItem, {
    foreignKey: "cart_id",
    onDelete: "CASCADE",
  });
};

Cart.belongsTo(User, { foreignKey: "user_id" });

export default Cart;
