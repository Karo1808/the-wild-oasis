import { BookingType } from "../features/bookings/BookingType";
import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export function getToday(options?: { end?: boolean }): string {
  const { end = false } = options || {};
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  if (end) {
    return `${year}-${month}-${day}T23:59:59Z`;
  }

  return `${year}-${month}-${day}T00:00:00Z`;
}

interface getBookingsParams {
  filter: {
    field: string;
    value: string;
  };
  sortBy: string;
  currentPage: number;
}

export const getBookings = async ({
  filter,
  sortBy,
  currentPage,
}: getBookingsParams): Promise<BookingType[]> => {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice , cabins(name), guests(fullName, email)"
    );

  if (filter !== null) query = query.eq(filter.field, filter.value);

  if (sortBy !== null) {
    const [column, direction] = sortBy.split("-");
    query = query.order(column, { ascending: direction === "asc" });
  } else {
    query = query.order("startDate", { ascending: false });
  }

  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  // eslint-disable-next-line
  //@ts-ignore
  return data;
};

interface getAllBookingParams {
  filter: {
    field: string | null;
    value: string;
  };
}

export const getAllBookings = async ({
  filter,
}: getAllBookingParams): Promise<BookingType[]> => {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice , cabins(name), guests(fullName, email)"
    );

  if (filter && filter.field !== null) {
    query = query.eq(filter.field, filter.value);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  // eslint-disable-next-line
  //@ts-ignore
  return data;
};

export interface SingleBookingType {
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  status: string;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: {
    name: string;
  };
}

export async function getBooking(id?: string): Promise<SingleBookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export interface bookingsAfterDate {
  created_at: string;
  extrasPrice: number;
  totalPrice: number;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: string
): Promise<bookingsAfterDate[]> {
  console.log("test");
  const today = getToday({ end: true }); // Get today's date as a Date object

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date) // Pass the date object directly
    .lte("created_at", today); // Pass the today object directly

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export interface stayType {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  status: string;
  cabinId: string;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<stayType[]> {
  console.log("test");
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  console.log(data);

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<stayType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  console.log(data);
  return data;
}

export interface updateBookingType {
  id?: string;
  created_at?: Date;
  startDate?: Date;
  endDate?: Date;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  status?: string;
}

export async function updateBooking(
  obj: updateBookingType,
  id?: string
): Promise<SingleBookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteSingleBooking(
  id?: string
): Promise<SingleBookingType | null> {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  if (!data) return null;

  return data;
}
