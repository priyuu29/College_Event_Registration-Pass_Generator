package com.example.Project.ticket.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

public class QRGenerator {

    public static byte[] generateQRCode(String text) {
        try {
            QRCodeWriter writer = new QRCodeWriter();
            var bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE, 250, 250);

            BufferedImage image = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);

            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);

            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("QR Generation failed");
        }
    }
}