import HomeClient from "@/components/HomeClient";
import HomeSections from "@/components/HomeSections";
export const revalidate = 86400;
export default function Page() { return <><HomeClient /><HomeSections /></>; }
