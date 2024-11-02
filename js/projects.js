'use strict';

function projects_events()
{
	let sort_by = 'Date';
	let done = [];
	let elements = [];

	async function in_animation_check()
	{
		for (let i = 0; i < elements.length; i++)
			if (!done[i] && is_in_viewport(elements[i]))
			{
				if (elements[i].classList.contains('other_project'))
					await sleep(100);

				elements[i].style.opacity = '1';
				elements[i].style.transform = 'translateY(0)';
				done[i] = true;
				await sleep(300);
			}
	}

	window.addEventListener('scroll', (e) =>
	{
		in_animation_check();
	});

	window.addEventListener('resize', (e) =>
	{
		in_animation_check();
	});

	function add_project(project, inverted, featured)
	{
		let tags = '';

		if (featured)
		{
			for (let tag of project.tags)
				tags += `<a href="${tag.url}" target="_blank">${tag.name}</a>`;

			if (window.innerWidth > 780)
			{
				document.querySelector('#projects_section .projects_content').innerHTML += `
					<div class="in_animation project ${inverted ? 'inverted' : ''}">
						<div class="project_text">
							<div class="type">
								<span>${project.date}</span>
								<span>•</span>
								<span>${project.type}</span>
							</div>
							<a class="project_title" href="${project.links[0]}" target="_blank">${project.title}</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` + tags + `</div>
							<div class="links">` + (project.links[1] == 'none' ? '' : `
								<a class="github" href="${project.links[1]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									<span class="bubble">Voir sur github</span>
								</a>
								`) + (project.links[2] == 'none' ? '' : `
								<a class="test" href="${project.links[2]}" target="_blank">
									<svg class="svg" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path stroke-width="0.75" d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"/>
										<path stroke-width="1.75" d="M15.47 7.83C14.8819 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62974 2.56129 8 2.5C6.37026 2.56129 4.79419 3.09878 3.4666 4.04604C2.13901 4.99331 1.11808 6.30882 0.530001 7.83C0.490285 7.93985 0.490285 8.06015 0.530001 8.17C1.11808 9.69118 2.13901 11.0067 3.4666 11.954C4.79419 12.9012 6.37026 13.4387 8 13.5C9.62974 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.8819 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83V7.83ZM8 11.25C7.35721 11.25 6.72886 11.0594 6.1944 10.7023C5.65994 10.3452 5.24338 9.83758 4.99739 9.24372C4.75141 8.64986 4.68705 7.99639 4.81245 7.36596C4.93785 6.73552 5.24738 6.15642 5.7019 5.7019C6.15642 5.24738 6.73552 4.93785 7.36596 4.81245C7.9964 4.68705 8.64986 4.75141 9.24372 4.99739C9.83758 5.24338 10.3452 5.65994 10.7023 6.1944C11.0594 6.72886 11.25 7.35721 11.25 8C11.2487 8.86155 10.9058 9.68743 10.2966 10.2966C9.68743 10.9058 8.86155 11.2487 8 11.25V11.25Z"/>
									</svg>
									<span class="bubble">Consulter</span>
								</a>
								`) + `
							</div>
						</div>
						<div class="project_view">
							<a ${is_safari() ? 'class="safari_fix"' : ''} href="${project.links[0]}" target="_blank">
								<img src="${project.image}" alt="${project.title.toLowerCase()} image" width="1440px" height="810px"/>
								` + (project.video == 'none' || is_safari() ? '' : `
								<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
								<video loop muted preload="metadata">
									<source src="${project.video}" type="video/mp4"/>
								</video>
								`) + `
							</a>
						</div>
					</div>`;
			}

			else
			{
				document.querySelector('#projects_section .projects_content').innerHTML += `
					<div class="in_animation project ${is_safari() ? 'safari_fix' : ''}" style="background-image: url(${project.image});">
						<div class="project_text"">
							<div class="type">
								<span>${project.type}</span>
								<span>•</span>
								<span>${project.date}</span>
							</div>
							<a class="project_title" href="${project.links[0]}" target="_blank">${project.title}</a>
							<div class="text"><p>${project.description}</p></div>
							<div class="tags">` + tags + `</div>
							<div class="links">` + (project.links[1] == 'none' ? '' : `
								<a class="github" href="${project.links[1]}" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									<span class="bubble">Voir sur github</span>
								</a>
								`) + (project.links[2] == 'none' ? '' : `
								<a class="test" href="${project.links[2]}" target="_blank">
									<svg class="svg" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path stroke-width="0.75" d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"/>
										<path stroke-width="1.75" d="M15.47 7.83C14.8819 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62974 2.56129 8 2.5C6.37026 2.56129 4.79419 3.09878 3.4666 4.04604C2.13901 4.99331 1.11808 6.30882 0.530001 7.83C0.490285 7.93985 0.490285 8.06015 0.530001 8.17C1.11808 9.69118 2.13901 11.0067 3.4666 11.954C4.79419 12.9012 6.37026 13.4387 8 13.5C9.62974 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.8819 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83V7.83ZM8 11.25C7.35721 11.25 6.72886 11.0594 6.1944 10.7023C5.65994 10.3452 5.24338 9.83758 4.99739 9.24372C4.75141 8.64986 4.68705 7.99639 4.81245 7.36596C4.93785 6.73552 5.24738 6.15642 5.7019 5.7019C6.15642 5.24738 6.73552 4.93785 7.36596 4.81245C7.9964 4.68705 8.64986 4.75141 9.24372 4.99739C9.83758 5.24338 10.3452 5.65994 10.7023 6.1944C11.0594 6.72886 11.25 7.35721 11.25 8C11.2487 8.86155 10.9058 9.68743 10.2966 10.2966C9.68743 10.9058 8.86155 11.2487 8 11.25V11.25Z"/>
									</svg>
									<span class="bubble">Consulter</span>
								</a>
								`) + `
							</div>
						</div>
					</div>`;
			}
		}

		else
		{
			for (let tag of project.tags)
				tags += `<span>${tag.name}</span>`;

			document.querySelector('#projects_section .other_projects_content').innerHTML += `
				<div class="in_animation other_project">
					<div class="other_project_content">
						<div class="header">
							<div class="logos">
								<img src="${project.logo}" alt="${project.title.toLowerCase()} logo" width="45px" height="45px"/>
								<div class="links">
									` + (project.links[1] == 'none' ? '' : `
									<a class="github" href="${project.links[1]}" aria-label="github" target="_blank">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31"><g><path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"/></g></svg>
									</a>
									`) + (project.links[2] == 'none' ? '' : `
									<a class="test" href="${project.links[2]}" aria-label="test" target="_blank">
									<svg class="svg" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path stroke-width="0.75" d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"/>
										<path stroke-width="1.75" d="M15.47 7.83C14.8819 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62974 2.56129 8 2.5C6.37026 2.56129 4.79419 3.09878 3.4666 4.04604C2.13901 4.99331 1.11808 6.30882 0.530001 7.83C0.490285 7.93985 0.490285 8.06015 0.530001 8.17C1.11808 9.69118 2.13901 11.0067 3.4666 11.954C4.79419 12.9012 6.37026 13.4387 8 13.5C9.62974 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.8819 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83V7.83ZM8 11.25C7.35721 11.25 6.72886 11.0594 6.1944 10.7023C5.65994 10.3452 5.24338 9.83758 4.99739 9.24372C4.75141 8.64986 4.68705 7.99639 4.81245 7.36596C4.93785 6.73552 5.24738 6.15642 5.7019 5.7019C6.15642 5.24738 6.73552 4.93785 7.36596 4.81245C7.9964 4.68705 8.64986 4.75141 9.24372 4.99739C9.83758 5.24338 10.3452 5.65994 10.7023 6.1944C11.0594 6.72886 11.25 7.35721 11.25 8C11.2487 8.86155 10.9058 9.68743 10.2966 10.2966C9.68743 10.9058 8.86155 11.2487 8 11.25V11.25Z"/>
									</svg>
									</a>
									`) + `
								</div>
							</div>
							<a href="${project.links[0]}" target="_blank" class="project_title">${project.title}</a>
							<p class="text">${project.description}</p>
						</div>
						<div class="tags">` + tags + `</div>
					</div>
				</div>`;
		}
	}

	function generate(data)
	{
		document.querySelector('#projects_section .projects_content').innerHTML = '';
		document.querySelector('#projects_section .other_projects_content').innerHTML = '';
		let inverted = true;
		let i = 0;

		if (sort_by == 'Date')
		{
			data.projects.sort((a, b) =>
			{
				return b.date - a.date;
			});
		}

		for (let project of data.projects)
		{
			let featured;

			if (sort_by == 'Default' || sort_by == 'Date')
				featured = i < 4;
			else
				featured = project.categories.includes(sort_by);

			if (featured)
				inverted = !inverted;

			add_project(project, inverted, featured);
			i++;
		}

		done = [];
		elements = document.querySelectorAll('#projects_section .in_animation');

		for (let _ of elements)
			done.push(false);

		in_animation_check();
		videos_scroll_event();
	}

	function generate_projects()
	{
		read_json("resources/jsons/projects.json", generate);
	}

	let prev_width = window.innerWidth;
	generate_projects();

	window.addEventListener('resize', () =>
	{
		if ((prev_width >= 780 && window.innerWidth <= 780) || (prev_width <= 780 && window.innerWidth >= 780))
		{
			generate_projects();
			prev_width = window.innerWidth;
		}
	});

	document.querySelectorAll('#projects_section .sort_choices .choice').forEach((el) =>
	{
		el.addEventListener('click', () =>
		{
			sort_by = el.innerHTML;
			generate_projects();

			document.querySelectorAll('#projects_section .sort_choices .choice').forEach((el) =>
			{
				el.classList.remove('selected');
			});

			el.classList.add('selected');
		});
	});
}
