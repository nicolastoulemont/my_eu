import React from 'react';
import PublicSuggestionPanel from './PublicSuggestions';

const PublicSideBar = () => {
	return (
		<div className="sticky">
			<div className="row ml-2 mb-4">
				<div className="col mx-auto bg-white px-2 py-2">
					<PublicSuggestionPanel />
				</div>
			</div>
			<div className="row ml-2 mb-4">
				<div className="col mx-auto bg-white px-2 py-2">
					<div className="row">
						<div className="col p-4">
							<p className="text-justify p-0 m-0">
								<small>
									<span className="font-weight-bold text-blue">MyEU</span> tracks EU Public Affairs
									news and events, allowing you to :
								</small>
							</p>
							<p className="text-justify p-0 m-0">
								<small>
									<span className="font-weight-bold text-blue">Quickly monitor</span> news from all
									the EU institutions and stakeholders at a glance,{' '}
									<span className="font-weight-bold text-blue">at any time</span>.
								</small>
							</p>
							<p className="text-justify p-0 m-0">
								<small>
									<span className="font-weight-bold text-blue">Never miss</span> EU related events
									happening in the EU Affairs district.
								</small>
							</p>
							<div className="d-block">
								<p className="text-justify p-0 m-0">
									<small>
										<span className="font-weight-bold text-blue">Publish</span> EU related events on
										the plateform to :
									</small>
								</p>
								<ul>
									<li className="text-left">
										<small>
											- <span className="font-weight-bold text-blue">Gain</span> more visibility and
											increase engagement levels.
										</small>
									</li>
									<li className="text-left">
										<small>
											- <span className="font-weight-bold text-blue">Easily</span> manage your
											events registrations and Q&A.
										</small>
									</li>
									<li className="text-left">
										<small>
											- <span className="font-weight-bold text-blue">Enjoy</span> a quick and easy
											registration process.
										</small>
									</li>
								</ul>
							</div>
							<p className="text-center m-0">
								<small>
									<span className="font-weight-bold text-secondary">
										Copyright &copy; {new Date().getFullYear()} Nicolas Toulemont
									</span>
								</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublicSideBar;
