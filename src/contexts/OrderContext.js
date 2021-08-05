import { createContext } from "react";

export const OrderContext = createContext();

export const OrderProvider = OrderContext.Provider;

OrderContext.displayName = "Order Context";
