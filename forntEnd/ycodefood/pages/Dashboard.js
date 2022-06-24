import Home from "./dashboard/Home";
import Layout from "../components/Layout";
import BarGraf from "./dashboard/chartjs/BarGraf";
import PieGraph from "./dashboard/chartjs/PieGraph";

export default function Dashboard() {
    return (
        <>

            <Layout>


                <Home />
                <div className="flex items-center justify-evenly flex-row">
                    <BarGraf />
                    <PieGraph />
                </div>
            </Layout>

        </>
    )
}