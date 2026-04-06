import jsPDF from 'jspdf';

export const generarFacturaPDF = async (facturaData, detallesPedido) => {
    try {
        const doc = new jsPDF();
        const fecha = new Date(facturaData.fechaFactura).toLocaleDateString();
        const hora = new Date(facturaData.fechaFactura).toLocaleTimeString();
        
        const marginLeft = 20;
        let currentY = 20;
        
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("Papelería Lapizito", 105, currentY, null, null, 'center');
        currentY += 10;
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Factura #${facturaData.idFactura}`, 105, currentY, null, null, 'center');
        currentY += 15;
        
        doc.setFontSize(10);
        doc.text(`Fecha: ${fecha} ${hora}`, marginLeft, currentY);
        doc.text(`Pedido #: ${facturaData.idPedido}`, 140, currentY);
        currentY += 7;
        
        doc.text(`Cliente: ${facturaData.nombre || ''} ${facturaData.apPaterno || ''}`, marginLeft, currentY);
        doc.text(`CI: ${facturaData.ci_cliente || ''}`, 140, currentY);
        currentY += 7;
        
        doc.text(`Método de pago: ${facturaData.metodoPago || 'EFECTIVO'}`, marginLeft, currentY);
        currentY += 10;
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text("Producto", marginLeft, currentY);
        doc.text("Cant.", marginLeft + 100, currentY);
        doc.text("Precio", marginLeft + 120, currentY);
        doc.text("Subtotal", marginLeft + 150, currentY);
        currentY += 7;
        
        doc.line(marginLeft, currentY, 190, currentY);
        currentY += 5;
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        
        let totalCalculado = 0;
        
        if (detallesPedido && Array.isArray(detallesPedido) && detallesPedido.length > 0) {
            detallesPedido.forEach((detalle, index) => {
                if (currentY > 260) {
                    doc.addPage();
                    currentY = 20;
                }
                
                const nombreProducto = detalle.nombreP || "Producto";
                const cantidad = detalle.cantidad || 1;
                const precio = parseFloat(detalle.precio || 0);
                const subtotal = parseFloat(detalle.subtotal || precio);
                totalCalculado += subtotal;
                
                const nombreTruncado = nombreProducto.length > 30 
                    ? nombreProducto.substring(0, 27) + "..." 
                    : nombreProducto;
                
                doc.text(nombreTruncado, marginLeft, currentY);
                doc.text(cantidad.toString(), marginLeft + 100, currentY);
                doc.text(`Bs. ${precio.toFixed(2)}`, marginLeft + 120, currentY);
                doc.text(`Bs. ${subtotal.toFixed(2)}`, marginLeft + 150, currentY);
                currentY += 7;
            });
        } else {
            const total = parseFloat(facturaData.total || 0);
            totalCalculado = total;
            doc.text("Consumo general", marginLeft, currentY);
            doc.text("1", marginLeft + 100, currentY);
            doc.text(`Bs. ${total.toFixed(2)}`, marginLeft + 120, currentY);
            doc.text(`Bs. ${total.toFixed(2)}`, marginLeft + 150, currentY);
            currentY += 7;
        }
        
        currentY += 5;
        
        doc.line(marginLeft + 120, currentY, 190, currentY);
        currentY += 10;
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        const totalFinal = totalCalculado || parseFloat(facturaData.total || 0);
        doc.text("TOTAL:", marginLeft + 120, currentY);
        doc.text(`Bs. ${totalFinal.toFixed(2)}`, marginLeft + 150, currentY);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Gracias por su compra - Libreria Lapicito", 105, 280, null, null, 'center');
        doc.text("Teléfono: 12345678 - Dirección: ZONA MIRAFLORES", 105, 285, null, null, 'center');
        doc.text("Este documento es válido como factura", 105, 290, null, null, 'center');
        
        const nombreArchivo = `factura_${facturaData.idFactura}.pdf`;
        doc.save(nombreArchivo);
        
        return true;
    } catch (error) {
        console.error('Error generando PDF:', error);
        throw error;
    }
};

export const generarReporteVentasPDF = async (facturas, periodo) => {
    try {
        const doc = new jsPDF();
        let currentY = 20;
        const marginLeft = 20;
        
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("Reporte de Ventas", 105, currentY, null, null, 'center');
        currentY += 10;
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(periodo || "Período General", 105, currentY, null, null, 'center');
        currentY += 15;
        
        doc.setFontSize(10);
        const totalVentas = facturas.reduce((sum, f) => sum + parseFloat(f.total || 0), 0);
        const totalFacturas = facturas.length;
        
        doc.text(`Total Facturas: ${totalFacturas}`, marginLeft, currentY);
        doc.text(`Total Ventas: Bs. ${totalVentas.toFixed(2)}`, 120, currentY);
        currentY += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text("# Factura", marginLeft, currentY);
        doc.text("Pedido", marginLeft + 30, currentY);
        doc.text("Cliente", marginLeft + 60, currentY);
        doc.text("Fecha", marginLeft + 100, currentY);
        doc.text("Total", marginLeft + 140, currentY);
        currentY += 5;
        
        doc.line(marginLeft, currentY, 190, currentY);
        currentY += 5;
        
        doc.setFont(undefined, 'normal');
        facturas.forEach((factura, index) => {
            if (currentY > 260) {
                doc.addPage();
                currentY = 20;
            }
            
            const nombreCliente = `${factura.nombre || ''} ${factura.apPaterno || ''}`.trim();
            const nombreCorto = nombreCliente.length > 15 
                ? nombreCliente.substring(0, 12) + "..." 
                : nombreCliente;
            
            doc.text(factura.idFactura.toString(), marginLeft, currentY);
            doc.text(factura.idPedido.toString(), marginLeft + 30, currentY);
            doc.text(nombreCorto, marginLeft + 60, currentY);
            doc.text(new Date(factura.fechaFactura).toLocaleDateString(), marginLeft + 100, currentY);
            doc.text(`Bs. ${parseFloat(factura.total || 0).toFixed(2)}`, marginLeft + 140, currentY);
            
            currentY += 7;
        });
        
        currentY += 10;
        
        const metodos = {};
        facturas.forEach(f => {
            const metodo = f.metodoPago || 'NO ESPECIFICADO';
            metodos[metodo] = (metodos[metodo] || 0) + 1;
        });
        
        doc.setFont(undefined, 'bold');
        doc.text("Resumen por método de pago:", marginLeft, currentY);
        currentY += 7;
        
        doc.setFont(undefined, 'normal');
        Object.entries(metodos).forEach(([metodo, count]) => {
            doc.text(`${metodo}: ${count} facturas`, marginLeft + 10, currentY);
            currentY += 7;
        });
        
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Generado el: ${new Date().toLocaleString()}`, marginLeft, 280);
        
        const nombreArchivo = `reporte_ventas_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(nombreArchivo);
        
        return true;
    } catch (error) {
        console.error('Error generando reporte:', error);
        throw error;
    }
};