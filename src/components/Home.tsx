import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router";


function randomID(len: number) {
    let result = "";
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    let maxPos = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    // const roomID = getUrlParams().get("roomID") || randomID(5);
    const { roomId } = useParams();
    const roomID = roomId || randomID(5);  // Use roomId from URL or generate one
    const navigate = useNavigate()

    const meetingContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (meetingContainerRef.current) {
            const appID = parseInt(import.meta.env.VITE_PUBLIC_ZEGO_APP_ID);
            console.log("app id  = ",appID)
            const serverSecret = import.meta.env.VITE_PUBLIC_ZEGO_SERVER_SECRET; // Replace with your actual serverSecret
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                uuid(),
                "user" + Date.now(),
                3600
            );

            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call
            zp.joinRoom({
                container: meetingContainerRef.current,
                sharedLinks: [
                    {
                        name: "Invite Room Id",
                        url: window.location.pathname.replace("/home/", ""), 
                            // window.location.protocol +
                            // "//" +
                            // window.location.host +
                            // window.location.pathname 
                            // "/roomID=" +
                            // roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
                onReturnToHomeScreenClicked: () => {
                    navigate(`/`);
                }
            });
        }
    }, [roomID]);

    return (
        <div
            className="w-screen h-screen"
            ref={meetingContainerRef}
        //   style={{ width: "100vw", height: "100vh" }}
        ></div>
    );
}
