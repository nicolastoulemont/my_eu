import React from 'react';

const TermsModal = () => {
	return (
		<div
			className="modal fade"
			id="TermsOfServiceModal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="TermsOfServiceModal"
			aria-hidden="true"
		>
			<div className="modal-lg modal-dialog pt-2" role="document">
				<div className="modal-content p-2">
					<div className="modal-header p-2 m-0">
						<h5 className="modal-title" id="TermsOfServiceModal">
							Terms of service of the my-eu.eu website
						</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<h5 className="text-left">ARTICLE 1: Purpose</h5>
						<p className="text-left">
							The purpose of these "general conditions of use" is to provide a legal framework for
							the use of the my-eu.eu site and its services. This contract is concluded between: The
							website manager, hereinafter referred to as "the Publisher" and any natural or legal
							person wishing to access the site and its services, hereinafter referred to as "the
							User". The general conditions of use must be accepted by all Users, and their access
							to the site constitutes acceptance of these conditions.
						</p>
						<h5 className="text-left">ARTICLE 2: Legal information</h5>
						<p className="text-left">
							The my-eu.eu website is edited by Nicolas Toulemont, domiciled at 32 rue de
							Montmorency, Paris.
						</p>
						<h5 className="text-left">ARTICLE 3: Access to services</h5>
						<p className="text-left">
							The User of the my-eu.eu website has access to the following services:
						</p>
						<ul>
							<li className="text-left">
								{' '}
								- Link and title aggregation service for information relating to the institutions of
								the European Union and European public affairs stakeholders.
							</li>
							<li className="text-left">
								{' '}
								- Link and event title aggregation service for European Union institutions and
								European public affairs stakeholders.
							</li>
							<li className="text-left">
								{' '}
								- Hosting, publication and event management service on my-eu.eu.This service is only
								applicable to events published on my-eu.eu and not to aggregated events.
							</li>
							<li className="text-left">
								{' '}
								- Service to track user participation in events published on my-eu.eu.
							</li>
						</ul>
						<p className="text-left">
							Any User with access to the Internet can access the site free of charge and from
							anywhere. The costs incurred by the User to access it (internet connection, computer
							equipment, etc.) are not the responsibility of the Publisher.{' '}
						</p>
						<p className="text-left">
							The following services are not accessible to the User unless he is a member of the
							site (i.e. he is identified using his login details):
						</p>
						<ul>
							<li className="text-left">
								{' '}
								- Link and title aggregation service for information relating to the institutions of
								the European Union and European public affairs stakeholders.
							</li>
							<li className="text-left">
								{' '}
								- Link and event title aggregation service for European Union institutions and
								European public affairs stakeholders.
							</li>
							<li className="text-left">
								{' '}
								- Hosting, publication and event management service on my-eu.eu.This service is only
								applicable to events published on my-eu.eu and not to aggregated events.
							</li>
							<li className="text-left">
								{' '}
								- Service to track user participation in events published on my-eu.eu.
							</li>
						</ul>
						<p className="text-left">
							The Site and its various services may be interrupted or suspended by the Publisher, in
							particular during maintenance, without any obligation of notice or justification.
						</p>
						<h5 className="text-left">ARTICLE 4: User's responsibility</h5>
						<p className="text-left">
							The User is responsible for the risks associated with the use of his login and
							password. The User's password must remain secret. In the event of password disclosure,
							the Publisher declines all responsibility. The User assumes full responsibility for
							the use he makes of the information and content on the my-eu.eu website. Any use of
							the service by the User that directly or indirectly results in damage must be
							compensated for by the site.
						</p>
						<p className="text-left">The site allows members to publish on the site:</p>
						<ul>
							<li className="text-left">- Events</li>
							<li className="text-left">- Comments</li>
							<li className="text-left">- Alerts</li>
						</ul>
						<p className="text-left">
							The member undertakes to make comments that respect others and the law and accepts
							that these publications may be moderated or refused by the Publisher, without any
							obligation of justification. By publishing on the site, the User transfers to the
							publishing company the non-exclusive and free right to represent, reproduce, adapt,
							modify, distribute and distribute his publication, directly or through an authorized
							third party. However, the Publisher undertakes to cite the member when using its
							publication
						</p>
						<h5 className="text-left">ARTICLE 5 : Liability of the Publisher</h5>
						<p className="text-left">
							Any malfunction of the server or network cannot engage the responsibility of the
							Publisher. Similarly, the site cannot be held liable in the event of force majeure or
							the unforeseeable and insurmountable event of a third party. The my-eu.eu website
							undertakes to implement all necessary means to guarantee the security and
							confidentiality of data. However, it does not provide a guarantee of total security.
							The Publisher reserves the right to make no guarantee as to the reliability of the
							sources, although the information published on the site is deemed reliable.
						</p>
						<h5 className="text-left">ARTICLE 6: Intellectual Property</h5>
						<p className="text-left">
							The contents of the my-eu.eu website (logos, texts, graphic elements, etc.) are
							protected by copyright under the French Intellectual Property Code. The User must
							obtain the authorization of the site publisher before any reproduction, copy or
							publication of these various contents. These can be used by users for private
							purposes; any commercial use is prohibited. The User is fully responsible for any
							content he puts online and undertakes not to harm a third party. The Site Editor
							reserves the right to freely moderate or delete the content posted by users at any
							time, without justification.
						</p>
						<h5 className="text-left">ARTICLE 7: Personal data</h5>
						<p className="text-left">
							The User must provide personal information in order to register on the site. The
							user's e-mail address may be used by the my-eu.eu website for the communication of
							various information and account management. My-eu.eu guarantees the respect of the
							user's private life, in accordance with the law n°78-17 of 6 January 1978 relating to
							data processing, files and freedoms. In accordance with articles 39 and 40 of the law
							dated 6 January 1978, the User has the right to access, rectify, delete and oppose his
							personal data. The User exercises this right via:
						</p>
						<ul>
							<li className="text-left">- His personal space on the site;</li>
							<li className="text-left">- A contact form;</li>
							<li className="text-left">- By email to support@my-eu.eu</li>
						</ul>
						<h5 className="text-left">ARTICLE 8: Hypertext links</h5>
						<p className="text-left">
							The domains to which the hypertext links on the site lead do not engage the
							responsibility of the Editor of my-eu.eu who has no control over these links. It is
							possible for a third party to create a link to a page on the my-eu.eu website without
							the express permission of the publisher
						</p>
						<h5 className="text-left">ARTICLE 9: Evolution of the general conditions of use</h5>
						<p className="text-left">
							The my-eu.eu website reserves the right to modify the clauses of these general
							conditions of use at any time and without justification.
						</p>
						<h5 className="text-left">ARTICLE 10: Duration of the contract</h5>
						<p className="text-left">
							The duration of this contract is indefinite. The contract shall be effective against
							the User as from the beginning of use of the service.
						</p>
						<h5 className="text-left">ARTICLE 11: Applicable law and competent jurisdiction</h5>
						<p className="text-left">
							This contract is governed by French law. In the event of an unresolved dispute between
							the User and the Publisher, the courts of Paris are competent to settle the dispute.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermsModal;
