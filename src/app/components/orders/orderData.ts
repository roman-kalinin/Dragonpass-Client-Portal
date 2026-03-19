export type OrderType =
  | 'flight'
  | 'hotel'
  | 'airport-transfer'
  | 'airport-lounge'
  | 'esim'
  | 'event-ticket'
  | 'fast-track'
  | 'health-wellness';

export type BenefitType = 'ENTITLEMENT' | 'DISCOUNT' | null;
export type OrderStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface FlightSegment {
  airline: string;
  flightNumber: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  class: string;
}

export interface Order {
  id: string;
  orderRef: string;
  bookingRef: string;
  type: OrderType;
  serviceDate: string;
  benefit: BenefitType;
  total: number;
  paid: number | null;
  funded: number | null;
  status: OrderStatus;
  // Common booking info
  bookingId: string;
  bookingDate: string;
  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  // Payment breakdown
  basePrice: number;
  taxesFees: number;
  paymentMethod: string;
  // Type-specific fields
  serviceDescription?: string;
  // Flight-specific
  outboundSegment?: FlightSegment;
  inboundSegment?: FlightSegment;
  // Hotel-specific
  hotelBookingRef?: string;
  chainName?: string;
  propertyType?: string;
  // Airport Transfer-specific
  trafficType?: string;
  // eSIM-specific
  telecomProvider?: string;
  // General location/venue
  venue?: string;
}

export const orders: Order[] = [
  {
    id: 'order-1',
    orderRef: 'BK-FL-001',
    bookingRef: 'ABC123456',
    type: 'flight',
    serviceDate: '15 Mar 2024',
    benefit: null,
    total: 2190,
    paid: 2190,
    funded: 0,
    status: 'CONFIRMED',
    bookingId: 'BK-FL-001',
    bookingDate: '10 Mar 2024',
    customerName: 'James Harrison',
    customerEmail: 'james.harrison@example.com',
    customerPhone: '+44 7700 900123',
    basePrice: 1950,
    taxesFees: 240,
    paymentMethod: 'Visa ending 4242',
    serviceDescription: 'Flight: LHR → JFK · Business Class',
    outboundSegment: {
      airline: 'British Airways',
      flightNumber: 'BA 117',
      from: 'London Heathrow',
      fromCode: 'LHR',
      to: 'New York JFK',
      toCode: 'JFK',
      departure: '10:30',
      arrival: '13:45',
      duration: '7h 15m',
      class: 'Business',
    },
    inboundSegment: {
      airline: 'British Airways',
      flightNumber: 'BA 118',
      from: 'New York JFK',
      fromCode: 'JFK',
      to: 'London Heathrow',
      toCode: 'LHR',
      departure: '20:00',
      arrival: '08:15+1',
      duration: '7h 15m',
      class: 'Business',
    },
  },
  {
    id: 'order-2',
    orderRef: 'BK-HT-001',
    bookingRef: 'PLZ-2024-001',
    type: 'hotel',
    serviceDate: '15 Mar 2024',
    benefit: null,
    total: 2800,
    paid: 2800,
    funded: 0,
    status: 'CONFIRMED',
    bookingId: 'BK-HT-001',
    bookingDate: '10 Mar 2024',
    customerName: 'James Harrison',
    customerEmail: 'james.harrison@example.com',
    customerPhone: '+44 7700 900123',
    basePrice: 2500,
    taxesFees: 300,
    paymentMethod: 'Visa ending 4242',
    serviceDescription: 'Hotel: The Plaza · New York · 5 nights',
    hotelBookingRef: 'PLZ-2024-001',
    chainName: 'Marriott International',
    propertyType: 'Luxury Hotel',
  },
  {
    id: 'order-3',
    orderRef: 'BK-AT-001',
    bookingRef: 'LHR-AT-001',
    type: 'airport-transfer',
    serviceDate: '15 Mar 2024',
    benefit: 'ENTITLEMENT',
    total: 85,
    paid: 0,
    funded: 85,
    status: 'CONFIRMED',
    bookingId: 'BK-AT-001',
    bookingDate: '10 Mar 2024',
    customerName: 'James Harrison',
    customerEmail: 'james.harrison@example.com',
    customerPhone: '+44 7700 900123',
    basePrice: 75,
    taxesFees: 10,
    paymentMethod: 'Benefit Funded',
    serviceDescription: 'Airport Transfer: LHR T5 → Central London',
    trafficType: 'Departure',
  },
  {
    id: 'order-4',
    orderRef: 'BK-AL-001',
    bookingRef: 'LHR-LG-001',
    type: 'airport-lounge',
    serviceDate: '15 Mar 2024',
    benefit: 'ENTITLEMENT',
    total: 45,
    paid: 0,
    funded: 45,
    status: 'CONFIRMED',
    bookingId: 'BK-AL-001',
    bookingDate: '10 Mar 2024',
    customerName: 'James Harrison',
    customerEmail: 'james.harrison@example.com',
    customerPhone: '+44 7700 900123',
    basePrice: 45,
    taxesFees: 0,
    paymentMethod: 'Benefit Funded',
    serviceDescription: 'Lounge: Plaza Premium (LHR T2) · 3h access',
    venue: 'Plaza Premium Lounge, LHR T2',
  },
  {
    id: 'order-5',
    orderRef: 'BK-ES-001',
    bookingRef: 'ESIM-US-001',
    type: 'esim',
    serviceDate: '14 Mar 2024',
    benefit: 'ENTITLEMENT',
    total: 25,
    paid: 0,
    funded: 25,
    status: 'CONFIRMED',
    bookingId: 'BK-ES-001',
    bookingDate: '09 Mar 2024',
    customerName: 'James Harrison',
    customerEmail: 'james.harrison@example.com',
    customerPhone: '+44 7700 900123',
    basePrice: 25,
    taxesFees: 0,
    paymentMethod: 'Benefit Funded',
    serviceDescription: 'eSIM: USA · 7 days · 5GB data',
    telecomProvider: 'AT&T USA',
  },
  {
    id: 'order-6',
    orderRef: 'BK-FL-002',
    bookingRef: 'EK789012',
    type: 'flight',
    serviceDate: '20 Mar 2024',
    benefit: null,
    total: 1850,
    paid: 1850,
    funded: 0,
    status: 'CONFIRMED',
    bookingId: 'BK-FL-002',
    bookingDate: '12 Mar 2024',
    customerName: 'Sarah Mitchell',
    customerEmail: 'sarah.mitchell@example.com',
    customerPhone: '+44 7700 900456',
    basePrice: 1650,
    taxesFees: 200,
    paymentMethod: 'Mastercard ending 8888',
    serviceDescription: 'Flight: LHR → DXB · Economy Class',
    outboundSegment: {
      airline: 'Emirates',
      flightNumber: 'EK 002',
      from: 'London Heathrow',
      fromCode: 'LHR',
      to: 'Dubai International',
      toCode: 'DXB',
      departure: '14:15',
      arrival: '00:30+1',
      duration: '6h 15m',
      class: 'Economy',
    },
  },
  {
    id: 'order-7',
    orderRef: 'BK-HT-002',
    bookingRef: 'MAN-NY-99',
    type: 'hotel',
    serviceDate: '20 Mar 2024',
    benefit: 'DISCOUNT',
    total: 4225,
    paid: 3500,
    funded: 725,
    status: 'CONFIRMED',
    bookingId: 'BK-HT-002',
    bookingDate: '12 Mar 2024',
    customerName: 'Sarah Mitchell',
    customerEmail: 'sarah.mitchell@example.com',
    customerPhone: '+44 7700 900456',
    basePrice: 3800,
    taxesFees: 425,
    paymentMethod: 'Mastercard ending 8888',
    serviceDescription: 'Hotel: Mandarin Oriental · New York · 7 nights',
    hotelBookingRef: 'MAN-NY-99',
    chainName: 'Mandarin Oriental',
    propertyType: 'Luxury Hotel',
  },
  {
    id: 'order-8',
    orderRef: 'BK-FL-003',
    bookingRef: 'BA998877',
    type: 'flight',
    serviceDate: '02 Apr 2024',
    benefit: null,
    total: 1250,
    paid: 1250,
    funded: 0,
    status: 'CONFIRMED',
    bookingId: 'BK-FL-003',
    bookingDate: '15 Mar 2024',
    customerName: 'David Chen',
    customerEmail: 'david.chen@example.com',
    customerPhone: '+44 7700 900789',
    basePrice: 1100,
    taxesFees: 150,
    paymentMethod: 'Amex ending 3737',
    serviceDescription: 'Flight: LHR → SIN · Economy Class',
    outboundSegment: {
      airline: 'British Airways',
      flightNumber: 'BA 011',
      from: 'London Heathrow',
      fromCode: 'LHR',
      to: 'Singapore Changi',
      toCode: 'SIN',
      departure: '21:25',
      arrival: '17:10+1',
      duration: '12h 45m',
      class: 'Economy',
    },
  },
];
