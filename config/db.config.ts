import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        if (process.env.NODE_ENV === "test") {
            await mongoose.connect(process.env.MONGODB_ATLAS_URL ?? "", {
                serverSelectionTimeoutMS: 2000,
            });
            console.log("MongoDB Connected (test mode)");
            return;
        }

        // production / dev mode
        const conn = await mongoose.connect(process.env.MONGODB_ATLAS_URL ?? "", {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("disconnected", () => {
            console.warn(" MongoDB Disconnected. Retrying.....");
            setTimeout(connectDB, 5000);
        });

    } catch (error) {
        console.log("Failed to Connect to DB:: ", (error as Error).message);
        if (process.env.NODE_ENV !== "test") {
            setTimeout(connectDB, 5000);
        }
    }
};

export default connectDB;