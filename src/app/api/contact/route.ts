import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validação
const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados
    const validatedData = contactSchema.parse(body);

    // Configurar dados do e-mail
    const emailData = {
      to: process.env.CONTACT_EMAIL || "contato@suzibrito.adv.br",
      subject: `Nova mensagem de contato - ${validatedData.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Nova Mensagem de Contato
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Dados do Cliente:</h3>
            <p><strong>Nome:</strong> ${validatedData.nome}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Telefone:</strong> ${validatedData.telefone}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Mensagem:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${
              validatedData.mensagem
            }</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}
            </p>
             <p style="margin: 5px 0 0 0; color: #1e40af; font-size: 14px;">
               <strong>IP:</strong> ${
                 request.headers.get("x-forwarded-for") ||
                 request.headers.get("x-real-ip") ||
                 "Não disponível"
               }
             </p>
          </div>
        </div>
      `,
      text: `
        Nova Mensagem de Contato
        
        Dados do Cliente:
        Nome: ${validatedData.nome}
        Email: ${validatedData.email}
        Telefone: ${validatedData.telefone}
        
        Mensagem:
        ${validatedData.mensagem}
        
         Data/Hora: ${new Date().toLocaleString("pt-BR")}
         IP: ${
           request.headers.get("x-forwarded-for") ||
           request.headers.get("x-real-ip") ||
           "Não disponível"
         }
      `,
    };

    // Enviar e-mail usando Resend (recomendado para Next.js)
    if (process.env.RESEND_API_KEY) {
      const resend = await import("resend");
      const resendClient = new resend.Resend(process.env.RESEND_API_KEY);

      const result = await resendClient.emails.send({
        from: "noreply@suzibrito.adv.br",
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });

      if (result.error) {
        throw new Error(`Erro ao enviar e-mail: ${result.error.message}`);
      }

      return NextResponse.json(
        {
          success: true,
          message: "Mensagem enviada com sucesso!",
          emailId: result.data?.id,
        },
        { status: 200 }
      );
    }

    // Fallback: usar Nodemailer se Resend não estiver configurado
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const nodemailer = await import("nodemailer");

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });

      return NextResponse.json(
        { success: true, message: "Mensagem enviada com sucesso!" },
        { status: 200 }
      );
    }

    // Se nenhum serviço de e-mail estiver configurado, apenas logar
    console.log("Dados do formulário recebidos:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem recebida! (E-mail não configurado)",
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar formulário:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
