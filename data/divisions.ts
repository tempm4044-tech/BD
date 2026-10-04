import type { Division } from "@/types";
const d = (id: string, name: string, bn: string): Division => ({ id, name, bn, cover: null, description: null });
export const divisions: Division[] = [
  d("dhaka","Dhaka","ঢাকা"), d("chattogram","Chattogram","চট্টগ্রাম"), d("rajshahi","Rajshahi","রাজশাহী"),
  d("khulna","Khulna","খুলনা"), d("barishal","Barishal","বরিশাল"), d("sylhet","Sylhet","সিলেট"),
  d("rangpur","Rangpur","রংপুর"), d("mymensingh","Mymensingh","ময়মনসিংহ")];
