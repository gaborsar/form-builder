import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch as useDispatchOriginal } from "react-redux";
import type { Action } from "../root";

export const useDispatch = useDispatchOriginal<Dispatch<Action>>;
