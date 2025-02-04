const Instructions = (): JSX.Element => {
    return (
      <div className='lg:py-12 py-8 px-4 bg-gradient-to-t from-transparent sm:px-6 lg:px-8 dark:bg-zinc-950'>
        <div className="container">
            <div className="relative grid gap-[17px] sm:grid-cols-2 xl:grid-cols-[repeat(15,minmax(0,1fr))]">
                <div className="relative xl:col-span-5">
                    <div className="card-style">
                        <div className="card-style-bento">
                            <div className="flex gap-2">
                                <span className="text-2xl">✏</span>
                                <h3 className="text-white text-xl font-bold">Drawing type</h3>
                            </div>
                            <p className="text-white py-4">In the select box choose your drawing style. it could be polygon, string, point or circle </p>
                        </div>
                    </div>
                </div>
                <div className="text-white relative xl:col-span-5">
                    <div className="card-style">
                        <div className="card-style-bento">
                            <div className="flex gap-4">
                                <span className="text-2xl">🗺️</span>
                                <h3 className="text-white text-xl font-bold">How it works</h3>
                            </div>
                            <p className="text-white py-4">Once you select a drawing type, use your cursor to create your route on the map. Keep the cursor pressed until you complete your entire drawing - releasing it early will only capture the partial route.</p>
                        </div>
                    </div>
                </div>
                <div className="text-white relative sm:col-span-2 md:col-span-1 xl:col-span-5 card-style">
                     <div className="card-style">
                        <div className="card-style-bento">
                            <div className="flex gap-2">
                                <span className="text-2xl">🧼</span>
                                <h3 className="text-white text-xl font-bold">Erase</h3>
                            </div>
                            <p className="text-white py-4">To erase the design just click on the button clear drawings</p>
                        </div>
                    </div>
                </div>
                <div className="text-white relative sm:col-span-2 md:col-span-1 xl:col-span-6">
                     <div className="card-style">
                        <div className="card-style-bento lg:flex lg:flex-col">
                            <div className="flex gap-4">
                                <span className="text-2xl">💾</span>
                                <h3 className="text-white text-xl font-bold">Download GPX file</h3>
                            </div>
                            <p className="text-white py-4">Click in the button download GPX file, this file contains a series of lattiuted and longitudes</p>
                            <picture style={{ marginBlockStart: 'auto' }}>
                                <img  className='w-full h-full' alt='download image' src="src/assets/download.webp" />
                            </picture>
                        </div>
                    </div>
                </div>
                <div className="text-white relative sm:col-span-2 xl:col-span-9">
                     <div className="card-style">
                        <div className="card-style-bento">
                            <div className="flex gap-4">
                                <span className="text-2xl">🏃🏽‍♀️</span>
                                <h3 className="text-white text-xl font-bold">Upload to Garmin</h3>
                            </div>
                            <p className="text-white py-4">Upload it to your Garmin Connect account</p>
                            <picture>
                                <source srcSet="src/assets/garmin.webp" />
                                <img alt='garmin connect dashboard' src="src/assets/garminphoto.webp" />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };

  export default Instructions;