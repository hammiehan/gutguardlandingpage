import Reveal from "@/components/landing/Reveal";
import { patientVoicesContent } from "@/lib/landing-data";

export default function PatientVoices() {
  return (
    <section id="voices">
      <div className="mx">
        <Reveal>
          <div className="section-tag" style={{ color: "var(--bl)" }}>
            {patientVoicesContent.tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-h" style={{ color: "var(--d1)" }}>
            {patientVoicesContent.titleLead}
            <br />
            {patientVoicesContent.titleAccent}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="section-body" style={{ maxWidth: 520 }}>
            {patientVoicesContent.paragraph}
          </p>
        </Reveal>

        <div className="viber-cols">
          {patientVoicesContent.threads.map((thread, index) => (
            <Reveal key={thread.name} delay={index * 0.08}>
              <div className="viber-thread">
                <div className="viber-header">
                  <div className="viber-av" style={{ background: thread.avatarColor }}>
                    {thread.initials}
                  </div>
                  <div>
                    <div className="viber-dr-name">{thread.name}</div>
                    <div className="viber-dr-spec">{thread.meta}</div>
                  </div>
                </div>
                <div className="viber-body">
                  {thread.messages.map((message, messageIndex) => (
                    <div key={`${thread.name}-${messageIndex}`} className={`chat-bubble ${message.direction === "incoming" ? "chat-in" : "chat-out"}`}>
                      {message.text}
                    </div>
                  ))}
                  {thread.messages.at(-1)?.time ? <div className="chat-time">{thread.messages.at(-1)?.time}</div> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
