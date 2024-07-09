
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Admin = lazy(() => import('@/pages/Admin'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));

const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));

const Investor = lazy(() => import('@/pages/Investor'));
const InvestorCreate = lazy(() => import('@/pages/Investor/InvestorCreate'));

const InvestorRead = lazy(() => import('@/pages/Investor/InvestorRead'));
const InvestorUpdate = lazy(() => import('@/pages/Investor/InvestorUpdate'));


const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));
const Quote = lazy(() => import('@/pages/Quote/index'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));
const AdvancedSettings = lazy(() => import('@/pages/AdvancedSettings'));
const Profile = lazy(() => import('@/pages/Profile'));
const Lead = lazy(() => import('@/pages/Lead/index'));
const Offer = lazy(() => import('@/pages/Offer/index'));
const OfferCreate = lazy(() => import('@/pages/Offer/OfferCreate'));
const OfferRead = lazy(() => import('@/pages/Offer/OfferRead'));
const OfferUpdate = lazy(() => import('@/pages/Offer/OfferUpdate'));

const ExpenseCategory = lazy(() => import('@/pages/ExpenseCategory'));
const Expense = lazy(() => import('@/pages/Expense'));
const ProductCategory = lazy(() => import('@/pages/ProductCategory'));
const Product = lazy(() => import('@/pages/Product'));

const People = lazy(() => import('@/pages/People'));

const Company = lazy(() => import('@/pages/Company'));
const CompanyCreate = lazy(() => import('@/pages/Company/CompanyCreate'));
const CompanyRead = lazy(() => import('@/pages/Company/CompanyRead'));
const CompanyUpdate = lazy(() => import('@/pages/Company/CompanyUpdate'));

const Role = lazy(() => import('@/pages/Role'));
const RoleCreate = lazy(() => import('@/pages/Role/RoleCreate'));
const RoleRead = lazy(() => import('@/pages/Role/RoleRead'));
const RoleUpdate = lazy(() => import('@/pages/Role/RoleUpdate'));


const About = lazy(() => import('@/pages/About'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/verify/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/resetpassword/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },
    {
      path: '/admin',
      element: <Admin />,
      access: ['view_admin','edit_admin','delete_admin','create_admin'],
    },

    {
      path: '/people',
      element: <People />,
    },
    {
      path: '/company',
      element: <Company />,
      access:['view_company'],
    },
    {
      path: '/company/create',
      element: <CompanyCreate />,
      access:['create_company'],
    },
    {
      path: '/company/read/:id',
      element: <CompanyRead />,
      access:['view_company'],
    },
    {
      path: '/company/update/:id',
      element: <CompanyUpdate />,
      access:['edit_company'],
    },
    {
      path: '/role',
      element: <Role />,
      access:['view_role'],
    },
    {
      path: '/role/create',
      element: <RoleCreate />,
      access:['create_role'],
    },
    {
      path: '/role/read/:id',
      element: <RoleRead />,
      access:['view_role'],
    },
    {
      path: '/role/update/:id',
      element: <RoleUpdate />,
      access:['edit_role'],
    },
    {
      path: '/product',
      element: <Product />,
    },
    {
      path: '/category/product',
      element: <ProductCategory />,
    },

    {
      path: '/investment',
      element: <Invoice />,
      access:['view_investment']

    },
    {
      path: '/investment/create',
      element: <InvoiceCreate />,
      access:['create_investment']
    },
    {
      path: '/investment/read/:id',
      element: <InvoiceRead />,
      access:['view_investment']
    },
    {
      path: '/investment/update/:id',
      element: <InvoiceUpdate />,
      access:['edit_investment']
    },
    {
      path: '/investment/pay/:id',
      element: <InvoiceRecordPayment />,
      access:['edit_investment']
    },

    {
      path: '/investor',
      element: <Investor />,
      access:['view_investor']
    },
    {
      path: '/investor/create',
      element: <InvestorCreate />,
      access: ['create_investor'],
    },
    {
      path: '/investor/read/:id',
      element: <InvestorRead />,
      access: ['view_investor'],
    },
    {
      path: '/investor/update/:id',
      element: <InvestorUpdate />,
      access: ['edit_investor'],
    },

    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },

    {
      path: '/settings',
      element: <Settings />,
      access:['view_setting']
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
      access:['edit_setting']
    },
    {
      path: '/payment/mode',
      element: <PaymentMode />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },

    {
      path: '/settings/advanced',
      element: <AdvancedSettings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/lead',
      element: <Lead />,
    },
    {
      path: '/offer',
      element: <Offer />,
    },
    {
      path: '/offer/create',
      element: <OfferCreate />,
    },
    {
      path: '/offer/read/:id',
      element: <OfferRead />,
    },
    {
      path: '/offer/update/:id',
      element: <OfferUpdate />,
    },
    {
      path: '/expenses',
      element: <Expense />,
    },
    {
      path: 'category/expenses',
      element: <ExpenseCategory />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
