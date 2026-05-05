package com.example.Project.service;

import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;

import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;

@Service
public class QRService {

    public byte[] generateQR(String text) throws Exception {

        QRCodeWriter writer = new QRCodeWriter();

        var bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE, 250, 250);

        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", stream);

        return stream.toByteArray();
    }
}