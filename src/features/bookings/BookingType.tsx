export interface BookingType {
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  status: string;
  totalPrice: number;
  cabins: {
    name: any;
  }[];
  guests: {
    fullName: any;
    email: any;
  }[];
}
