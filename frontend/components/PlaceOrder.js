import React, { useState, useEffect } from "react";

//Element components provide a flexible way to securely collect payment information
import {CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';