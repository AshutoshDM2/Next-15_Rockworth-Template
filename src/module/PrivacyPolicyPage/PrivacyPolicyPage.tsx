"use client";

import Section from "@/common/Section/Section";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

const privacyData = {
  company: {
    name: "Rockworth Systems Furniture India Private Limited",
    website: "www.rockworthindia.com",
    email: "contact@rockworthindia.com",
    address:
      "800 West, Road R1 South, Sri City, Sathyavedu Mandal Tirupati District, Andhra Pradesh- 517646, India",
  },
};

export default function PrivacyPolicy() {
  return (
    <Section className="bg-white">
      {/* Header */}

      <h1 className="text-2xl lg:text-3xl font-medium text-black mb-2">
        Website Privacy Policy
      </h1>
      <p className="text-base text-gray-700 font-light leading-relaxed mb-4">
        {privacyData.company.name}
      </p>

      {/* Content */}
      <div className="mt-10">
        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Introduction
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            Rockworth Systems Furniture India Private Limited
            (&quot;Company&quot;, &quot;we&quot; or &quot;us&quot;), respects
            your privacy and we are committed to protecting it through our
            compliance with this policy.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            This policy describes the types of information we may collect from
            you or that you may provide when you visit www.rockworthindia.com
            (our &quot;Website&quot;) and our practices for collecting, using,
            maintaining, protecting and disclosing that information.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            This policy applies solely to information we collect on this Website
            and in e-mail, text and other electronic messages between you and
            this website. It does not apply to information collected by us
            offline or through any other means, including on any other website
            operated by us or any third party (including our affiliates) that
            may link to or be accessible from or on this Website.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            Please read this policy carefully to understand our current policies
            and practices regarding your information and how we will treat it.{" "}
            By submitting your personal information to us or by using this
            website, you agree that we can use your personal information as
            described in this Privacy Policy. You also confirm that you are
            either over 18 years old, or you have permission from a parent or
            guardian, and that you understand and agree to this policy.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            This policy may change from time to time as set out below under
            Changes to our Privacy Policy. Your continued use of this Website
            after we make changes is deemed to be acceptance of those changes,
            so please check the policy frequently for updates.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Children&apos;s Privacy
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            Our website does not knowingly intend to collect personal
            information from children under 13 years of age. If you are under
            13, do not use or provide any information on this Website or on or
            through any of its features.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            If we learn we have collected or received personal information from
            a child under 13 without verification of parental consent, we will
            delete that information.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Information We Collect About You and How We Collect It
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We may collect several types of information from and about users of
            our Website, including information: (a) by which you may be
            personally identified and that you will provide on a voluntary
            basis, such as name, postal address, e-mail address, telephone
            number or any other information that can be used to identify,
            describe, locate or contact you online or offline should you wish so
            (&quot;personal information&quot;) to provide you information on our
            products and services; (b) that is about you but individually does
            not identify you, such as the contents of your comments and postings
            on the Website; and/or (c) about your internet connection, the
            equipment you use to access our Website and usage details to improve
            your access and visit of our Website.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We collect this information depending on the context of your
            interactions with the Website, the features you use, and the choices
            you make. We rely on a variety of legal reasons and permissions
            (each a &quot;legal basis&quot;) to collect and process personal
            information about you, including with your consent, a balancing of
            legitimate interests, necessity to enter into and perform contracts
            with you, and compliance with legal obligations.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Information You Provide to Us
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            The information you provide directly to us on or through our Website
            may include:
          </p>
          <ul className="text-gray-700 text-base font-light leading-relaxed mb-4">
            <li>
              Information provided at the time of registering to use our Website
              or when requesting further services
            </li>
            <li>
              Records and copies of your correspondence (including e-mail
              addresses), if you contact us
            </li>
            <li>
              Your responses to surveys that we might ask you to complete for
              research purposes
            </li>
            <li>Your search queries on the Website</li>
            <li>
              Details of transactions you carry out through our Website and
              their fulfillment
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Information We Collect Through Automatic Data Collection
            Technologies
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            As you navigate through and interact with our website, we may use
            automatic data collection technologies to collect information about
            your equipment, browsing actions and patterns, including: (a)
            details of your visits to our website and other communication data
            and the resources that you access and use on the Website; and (b)
            information about your computer and internet connection, including
            your IP address, operating system and browser type.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            The information we collect automatically is often statistical data
            and does not include direct personal information, but we may
            maintain it or associate it with personal information we collect in
            other ways or receive from third parties. It helps us to improve our
            website and to deliver a better and more personalized service.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Cookies on the Website
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We use and engage certain other third-party advertising partners and
            analytics providers to use cookies, web beacons, and similar
            tracking technologies (collectively, &quot;cookies&quot;) on the
            Website. Cookies are small text files that are stored on your
            browser, device, or the page you are viewing.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            Cookies on our Website are generally classified into the following
            categories:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-700 text-base font-light leading-relaxed mb-4">
                Required/Operational Cookies
              </h3>
              <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
                These are required for the operation of our website and cannot
                be switched off in our systems. They are usually set in response
                to your actions and include, for example, cookies that enable
                you to log into secure areas, setting your own preferences, or
                filling in forms. These are session cookies that are erased when
                you close your browser and do not store any personal
                information.
              </p>
            </div>
            <div>
              <h3 className="text-gray-700 text-base font-light leading-relaxed mb-4">
                Performance/Analytical Cookies
              </h3>
              <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
                These allow us to recognize and count the number of users of our
                website and understand how users navigate through the Website.
                They tell us, for example, which pages are the most and least
                popular, which helps to improve how our website works by
                ensuring that users can find what they are looking for easily.
                All information these cookies collect is aggregated and
                therefore anonymous. We use Google Analytics.
              </p>
            </div>
            <div>
              <h3 className="text-gray-700 text-base font-light leading-relaxed mb-4">
                Advertising Cookies
              </h3>
              <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
                These may be set through our website by our authorized and
                trusted third-party advertising partners, which allows them to
                serve you targeted advertising (also referred to as &quot;online
                behavioural advertising&quot; or &quot;interest-based
                advertising&quot;) on our behalf across the Internet as you
                visit other websites that recognize the cookie. If you refuse or
                disable these cookies you will not enjoy targeted advertising
                from us or our advertising networks.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            How We Use Your Information
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We use information that we collect about you or that you provide to
            us, including any personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-base font-light leading-relaxed mb-4 space-y-2">
            <li>To present our website and its contents to you</li>
            <li>
              To provide you with information, products or services that you
              request from us
            </li>
            <li>To analyze and improve our products and services</li>
            <li>To market our products and services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Our Retention of Your Information
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We retain personal information only as permitted under applicable
            laws, including only for as long as necessary to provide the
            products or services and fulfill the transactions you have
            requested, or for other essential purposes such as complying with
            our legal obligations.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Accessing and Correcting Your Information
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            You can review and change your personal information by logging into
            the Website and visiting your account profile page. You may also
            contact us using the &quot;Contact Us&quot; form or email
            contact@rockworthindia.com to request access to, correct or delete
            any personal information that you have provided to us.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We cannot delete your personal information except by also deleting
            your user account. We may not accommodate a request to change
            information if we believe the change would violate any law or legal
            requirement or cause the information to be incorrect.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Data Security
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            We maintain appropriate technical and organizational security
            measures, designed to protect your personal information from
            accidental loss or destruction and from unauthorized access, misuse,
            alteration and disclosure, wherever it is stored or processed,
            including when personal information is transmitted over a private
            network or stored in cloud environments.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            The safety and security of your information also depends on you.
            Where we have given you (or where you have chosen) a password for
            access to certain parts of our Website, you are responsible for
            keeping this password confidential. We ask you not to share your
            password with anyone.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            Any transmission of your personal information is at your own risk.
            We are not responsible for circumvention of any privacy settings or
            security measures contained on the Website.
          </p>
        </section>

        <section className="mb-8">
          <h3
            className="
      text-black mb-2"
          >
            Changes to Our Privacy Policy
          </h3>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            It is our policy to post any changes we make to our privacy policy
            on this page. If we make material changes to how we treat our
            users&apos; personal information, we will notify you by e-mail to
            the e-mail address specified in your account, and/or through a
            notice on the Website home page.
          </p>
          <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
            The date the privacy policy was last revised is identified at the
            top of the page. You are responsible for ensuring we have an
            up-to-date active and deliverable e-mail address for you, and for
            periodically visiting our Website and this privacy policy to check
            for any changes.
          </p>
        </section>
      </div>

      {/* Contact Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-normal text-gray-900 mb-2">
          Contact Information
        </h3>
        <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
          To ask questions about this privacy policy or raise concerns about our
          privacy practices to Rockworth&apos;s India Privacy Lead or Data
          Protection Officer, please contact us by using our{" "}
          <Link href={"/contact-us"} className="text-brand-color">
            Contact Us
          </Link>{" "}
          form, or email us at contact@rockworthindia.com. We will respond to
          questions or concerns within 30 days.
        </p>

        <div className="space-y-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-500 mt-1 mr-3" />
            <div>
              <p className="text-gray-700 text-base font-normal leading-relaxed">
                Email :{" "}
              </p>
              <a
                href={`mailto:${privacyData.company.email}`}
                className="text-brand-color hover:underline"
              >
                {privacyData.company.email}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-12 w-12 lg:h-5 lg:w-5 text-gray-500 -mt-2 lg:mt-1 mr-2" />
            <div>
              <p className="text-gray-700 text-base font-normal leading-relaxed">
                India Headquarters :
              </p>
              <p className="text-gray-700 text-base font-light leading-relaxed mb-4">
                {privacyData.company.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
