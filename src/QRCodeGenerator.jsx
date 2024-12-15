import { useState } from "react";

export const QRCodeGenerator = () => {
    const [img, setImg] = useState("images/qrcode.svg");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("ashif");
    const [qrSize, setQrSize] = useState("150");

    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QR code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch((error)=>{
                console.error("Error downloading QR code", error);
            })
    }
    return (
        <div className="qrcode_container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please wait ....</p>}
            {img && <img src={img} alt="" className="qrcode_image"/>}
            <div className="qrcode_div" >
                <label htmlFor="dataInput" className="input-label">Data for QR Code:</label>
                <input id="dataInput" type="text" value={qrData} onChange={(e)=>setQrData(e.target.value)} placeholder="Enter data for QR code" />

                <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150):</label>
                <input id="sizeInput" type="text" value={qrSize} onChange={(e)=>setQrSize(e.target.value)} placeholder="Enter image size" />

                <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR Code</button>
                <button className="download-button" onClick={downloadQR}>Download QR Code</button>
            </div>
        </div>   
    )
}